#!flask/bin/python

###############---------------------------------------- Imports ----------------------------------------################

import logging
import requests
import networkx as nx
import matplotlib.pyplot as plt
from flask import Flask, request, jsonify, json, Response, render_template, redirect, session
from flaskext.mysql import MySQL
# Import helper from wekzeug.security to create hash password
from werkzeug.security import generate_password_hash, check_password_hash

###############---------------------------------------- Imports ----------------------------------------################




###############----------------------------------- Global Variables ------------------------------------################

app = Flask(__name__)
mysql = MySQL()

flight_graph = nx.Graph()
train_graph = nx.Graph()
bus_graph = nx.Graph()
taxi_graph = nx.Graph()

graphNames = [flight_graph, train_graph, bus_graph, taxi_graph]
nodeTableNames = ["tbl_flight_nodes", "tbl_train_nodes", "tbl_bus_nodes", "tbl_taxi_nodes"]
edgeTableNames = ["tbl_flight_edges", "tbl_train_edges", "tbl_bus_edges", "tbl_taxi_edges"]

###############----------------------------------- Global Variables ------------------------------------################




###############--------------------------------- Database Configuration --------------------------------################

# MySQL configurations - Creation of the connection
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'traveler-web-bot'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
dbName = 'traveler-web-bot'
mysql.init_app(app)

###############--------------------------------- Database Configuration --------------------------------################




###############-------------------------------- User SignIn and SignOut --------------------------------################

# Decorator index | Display's the main page (UI)
@app.route('/', methods=['GET'])
def main():
    return render_template('index.html')


@app.route('/showSignIn', methods=['GET'])
def showSignIn():
    return render_template('signin.html')


@app.route('/validateLogin', methods=['POST'])
def validateLogin():
    try:
        _username = request.form['inputEmail']
        _password = request.form['inputPassword']

        # connect to mysql

        con = mysql.connect()
        cursor = con.cursor()
        cursor.callproc('sp_validateLogin', (_username,))
        data = cursor.fetchall()

        if len(data) > 0:
            if check_password_hash(str(data[0][3]), _password):
                session['user'] = data[0][0]
                return redirect('/userHome')
            else:
                return render_template('error.html', error='Wrong Email address or Password.')
        else:
            return render_template('error.html', error='Wrong Email address or Password.')


    except Exception as e:
        return render_template('error.html', error=str(e))
    finally:
        cursor.close()
        con.close()


@app.route('/userHome', methods=['GET'])
def userHome():
    return render_template('userHome.html')


# Decorator showSignUp | Display's the singup page (UI)
@app.route('/showSignUp', methods=['GET'])
def showSignUp():
    return render_template('signup.html')


# Decorator singUp | Interface to create a User
@app.route('/signUp', methods=['POST'])
def signUp():
    try:
        # read the posted values from the form
        _name = request.form['inputName']
        _email = request.form['inputEmail']
        _password = request.form['inputPassword']
        # validate the received values
        if _name and _email and _password:
            connection = mysql.connect()
            cursor = connection.cursor()
            _hashed_password = generate_password_hash(_password)
            cursor.callproc('sp_createUser', (_name, _email, _hashed_password))
            data = cursor.fetchall()
            if len(data) is 0:
                connection.commit()
                return json.dumps({'message': 'User created successfully !'})
            else:
                return json.dump({'error': str(data[0])})
        else:
            return json.dump({'html': '<span>Enter the required fields</span>'})
    except Exception as e:
        return json.dump({'error': str(e)})
    finally:
        cursor.close()
        connection.close()


# Decorator showUsers | Route that display the list of users created
@app.route('/showUsers', methods=['GET'])
def ShowUsers():
    userArray = GetUserInfo()
    id = userArray[0]
    user = userArray[1]
    action = userArray[2]
    timestamp = userArray[3]
    json_content = {}
    for i in range(0, len(user)):
        temp = {"User" + str(id[i]): str(user[i]) + str(action[i]) + str(timestamp[i])}
        if json_content == {}:
            json_content = dict(temp)
        else:
            json_content.update(temp)
        res = json.dumps({"User Information": [json_content]})

    action = "Requested the list of all the users into the DB GET /showUsers "
    SaveLogToDB(action)
    return res


# Method to request the users saved in the Database
def GetUserInfo():
    # sqlActions = "SELECT action_name FROM `web-bot`.tbl_action;"
    # Query all the rows from a database table
    sql = "SELECT * FROM `+ dbName +`.tbl_user;"
    try:
        id, user, email, hashpass = [], [], [], []
        # create mySQL connection
        connection = mysql.connect()
        # create the cursor to query the store procedure
        cursor = connection.cursor()
        # executes the sql query to pull the tbl_action table values
        cursor.execute(sql)
        rowCount = cursor.fetchall()
        for r in rowCount:
            id.append(r[0])
            user.append(r[1])
            email.append(r[2])
            hashpass.append(str(r[3]))
        userArray = [id, user, email, hashpass]
        return userArray
    except Exception as e:
        return json.dump({'error': str(e)})
    finally:
        cursor.close()
        connection.close()

###############-------------------------------- User SignIn and SignOut --------------------------------################




###############------------------------------------- Graph Creation ------------------------------------################

# Get specific COLUMN from TABLE in Database
def GetColumnRows(column, table):
    # sqlActions = "SELECT action_name FROM `web-bot`.tbl_action;"
    # Query all the rows from a database table
    sql = "SELECT " + column + " FROM `traveler-web-bot`." + table + ";"
    try:
        columnRows = []
        # create mySQL connection
        connection = mysql.connect()
        # create the cursor to query the store procedure
        cursor = connection.cursor()
        # executes the sql query to pull the tbl_action table values
        cursor.execute(sql)
        rowCount = cursor.fetchall()
        # return an array with all the rows of the provided column.
        for row in rowCount:
            columnRows.append(row[0])
        return columnRows
    except Exception as e:
        # return json.dump({'error': str(e)})
        return print("failed")
    finally:
        cursor.close()
        connection.close()


def CreateGraph(graphName, column, table):
    ids = GetColumnRows(column, table)
    for index in range (0, len(ids)):
        graphName.add_node(ids[index])
    # print("nodes: " + str(graphName.nodes(graphName)))


def CreateEdge(graphName, node1, node2, weight, table):
    node1_ids = GetColumnRows(node1, table)
    node2_ids = GetColumnRows(node2, table)
    weights = GetColumnRows(weight, table)
    for index in range (0, len(node1_ids)):
        graphName.add_edge(node1_ids[index], node2_ids[index], weight=weights[index])
    # print("edges: " + str(graphName.edges(graphName)))


def GenerateGraphStructure():
    for index in range(0,len(nodeTableNames)):
        CreateGraph(graphNames[index], "id", nodeTableNames[index])
        CreateEdge(graphNames[index], "node1_id", "node2_id", "weight", edgeTableNames[index])

###############------------------------------------- Graph Creation ------------------------------------################




###############------------------------------------- Logs Handlers -------------------------------------################

# Decorator showLogs | Route that display the list of logs saved into the Data Base
@app.route('/showLogs', methods=['GET'])
def ShowLogs():
    logArray = GetLogInfo()
    id = logArray[0]
    user = logArray[1]
    action = logArray[2]
    timestamp = logArray[3]
    json_content = {}
    for i in range(0, len(user)):
        temp = {"Log" + str(id[i]): str(user[i]) + str(action[i]) + str(timestamp[i])}
        if json_content == {}:
            json_content = dict(temp)
        else:
            json_content.update(temp)
        res = json.dumps({"Log Information": [json_content]})
    action = "Requested the list of all the logs saved into the DB GET /showLogs "
    SaveLogToDB(action)
    return res


#Method to request all the logs saved in the Database
def GetLogInfo():
    # sqlActions = "SELECT action_name FROM `web-bot`.tbl_action;"
    # Query all the rows from a database table
    sql = "SELECT * FROM `+ dbName +`.tbl_log;"
    try:
        id, user, action, timestamp = [], [], [], []
        # create mySQL connection
        connection = mysql.connect()
        # create the cursor to query the store procedure
        cursor = connection.cursor()
        # executes the sql query to pull the tbl_action table values
        cursor.execute(sql)
        rowCount = cursor.fetchall()
        for r in rowCount:
            id.append(r[0])
            user.append(r[1])
            action.append(r[2])
            timestamp.append(str(r[3]))
        logArray = [id, user, action, timestamp]
        return logArray
    except Exception as e:
        return json.dump({'error': str(e)})
    finally:
        cursor.close()
        connection.close()


#Method that Save the logs into the DataBase
def SaveLogToDB(action):
    try:
        add_log = ("INSERT INTO tbl_log "
                   "(log_user, log_action) "
                   "VALUES (%s, %s)")
        # create mySQL connection
        connection = mysql.connect()
        # create the cursor to query the store procedure
        cursor = connection.cursor()
        # call the store procedure on the database to insert the data if it doesn't exist yet
        current_user = "Current User ( " + request.remote_addr + " ) "
        cursor.execute(add_log, (current_user, action))
        connection.commit()
    except Exception as e:
        return json.dump({'error': str(e)})
    finally:
        cursor.close()
        connection.close()

###############------------------------------------- Logs Handlers -------------------------------------################




# Decorator that informs the user that the route intered is not valid
@app.errorhandler(404)
def page_not_found(error):
    return 'Esta ruta no existe', 404


# Main
if __name__ == '__main__':
    GenerateGraphStructure()
    app.run(debug=True, port=8000, host='0.0.0.0')
    # app.run()
