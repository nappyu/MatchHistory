from flask import Flask, jsonify, request 
import psycopg2
from flask_cors import CORS
import flask

app = Flask(__name__)

con = psycopg2.connect("dbname=username user=u password=pass host=IPAdress")

CORS(app)


# Takes a player id and returns there entire match history
@app.route('/api/matchUp', methods=['POST'])
def getMatchUps():
    pid = request.json    
    if pid:
        p = pid['pid']
        if (p == ''):
            return        
        cur = con.cursor()
        cur.execute("SELECT hero, opponent, result FROM smashUps WHERE pid = %s ORDER BY mid DESC"% (p))
        rv = cur.fetchall()
        cur.close()
        return jsonify(rv)
    return "error no pid given"

# Gets the winrate of the current players specific matchup
@app.route('/api/matchUp/winRate', methods=['POST'])
def getWinRate():
    req = request.json    
    if req:
        cur = con.cursor()
        pid = req['pid']
        hero = req['hero']
        opp = req['opponent']
        cur.execute("SELECT count(*) FROM smashUps WHERE  pid = %s AND hero = %s AND opponent = %s;", (pid, hero, opp))
        totalMatches = cur.fetchall()
        if totalMatches == []:
            x = 'no matches'
            return jsonify(x)
        
        totalMatches = totalMatches[0][0]
        cur.execute("SELECT count(*) FROM smashUps WHERE  pid = %s AND hero = %s AND opponent = %s GROUP BY result HAVING result = 'win';", (pid, hero, opp))
        totalWins = cur.fetchall()
        if totalWins == []:
            x = "0%"
            return jsonify(x)        
        totalWins = totalWins[0][0]
        wr = totalWins/totalMatches
        wr = wr*100
        wr = str(wr)
        wr += "%"
        cur.close()
        return jsonify(wr)
    return "error no variables passed"


# TODO ADD DATE AND TIME TO EACH MATCH UP
# Adds to the matchup table this winning matchup
@app.route('/api/matchUp/win', methods=['POST'])
def win():
    req = request.json   
    if req:
        cur = con.cursor()
        pid = req['pid']
        hero = req['hero']
        opp = req['opponent']
        cur.execute("INSERT INTO smashups VALUES (%s, %s, %s, 'win', DEFAULT);", (pid, hero, opp))
        con.commit()
        cur.execute("SELECT count(*) FROM smashUps WHERE  pid = %s AND hero = %s AND opponent = %s;", (pid, hero, opp))
        totalMatches = cur.fetchall()
        totalMatches = totalMatches[0][0]
        cur.execute("SELECT count(*) FROM smashUps WHERE  pid = %s AND hero = %s AND opponent = %s GROUP BY result HAVING result = 'win';", (pid, hero, opp))
        totalWins = cur.fetchall()
        if totalWins == []:
            x = "0%"
            return jsonify(x)   
        else:        
            totalWins = totalWins[0][0]
        wr = totalWins/totalMatches
        wr = wr*100
        wr = str(wr)
        wr += "%"
        cur.close()
        return jsonify(wr)
        
        
    return "failed to add win"

# Adds to the matchup table this losing matchup
@app.route('/api/matchUp/loss', methods=['POST'])
def loss():
    req = request.json
    
    if req:
        cur = con.cursor()
        pid = req['pid']
        hero = req['hero']
        opp = req['opponent']
        cur.execute("INSERT INTO smashups VALUES (%s, %s, %s, 'loss', DEFAULT);", (pid, hero, opp))
        con.commit()
        cur.execute("SELECT count(*) FROM smashUps WHERE  pid = %s AND hero = %s AND opponent = %s;",(pid, hero, opp))
        totalMatches = cur.fetchall()
        totalMatches = totalMatches[0][0]
        cur.execute("SELECT count(*) FROM smashUps WHERE  pid = %s AND hero = %s AND opponent = %s GROUP BY result HAVING result = 'win';",(pid, hero, opp))
        totalWins = cur.fetchall()
        if totalWins == []:
            x = "0%"
            return jsonify(x)   
        totalWins = totalWins[0][0]
        
        wr = totalWins/totalMatches
        wr = wr*100
        wr = str(wr)
        wr += "%"
        cur.close()
        return jsonify(wr)  
    return "failed to add loss"

# Get all players in our database
@app.route('/api/player', methods=['GET'])
def getPlayers():
    cur = con.cursor()
    cur.execute("SELECT * FROM player")
    rv = cur.fetchall()
    cur.close()
    return jsonify(rv)

@app.route('/')
def home():
    return "hello"

# Get/check if a specific player is in our database
@app.route('/api/player/<id>', methods=['GET'])
def getPlayer(id):
    cur = con.cursor()
    cur.execute("SELECT * FROM player WHERE personid = %s", (id,))
    rv = cur.fetchall()
    cur.close()
    return jsonify(rv)

# Add a player to our player table given a name we generate a unique pid and insert
@app.route('/api/player', methods=['POST'])
def addPlayer():
    cur = con.cursor()
    name = request.get_json()['name']
    cur.execute("INSERT INTO player VALUES (DEFAULT, %s)", (name,))
    con.commit()
    result = {'name':name}
    cur.close()
    return jsonify({"result": result})

# Update a player given an playerid and the newly desired username
@app.route("/api/player/<id>", methods=['PUT'])
def updateName(id):
    cur = con.cursor()
    name = request.get_json()['name']    
    cur.execute("UPDATE player SET username = %s WHERE personid = %s", (name, id))
    con.commit()
    result = {"name": name}
    cur.close()
    return jsonify({"result": result})


if __name__ == '__main__':
    app.run(debug=True) 

con.close()