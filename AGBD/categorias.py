import mysql.connector
from flask import Flask, g, jsonify
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

def abrirConexion():
    if 'db' not in g:
        g.db = mysql.connector.connect(
            host=os.getenv("DB_HOST"),          # IP de tu servidor
            user=os.getenv("DB_USER"),          # tu usuario de MySQL
            password=os.getenv("DB_PASS"),      # tu contraseña
            database=os.getenv("DB_NAME"),      # tu base en phpMyAdmin
            port=int(os.getenv("DB_PORT"))      # puerto
        )
    return g.db

#muestra todas las basicas
@app.route('/api/basicas')
def mostrar_basicas():
    db = abrirConexion()
    cursor = db.cursor(dictionary=True)  # dictionary=True devuelve filas como diccionarios
    cursor.execute("SELECT nombre, marca, tipo, id_talles, precio FROM shoes WHERE tipo = 'basica'")  # productos es tu tabla
    data = cursor.fetchall()  # trae todas las filas
    cursor.close()
    db.close()
    
    return jsonify(data)  # por ahora devolvemos los resultados como texto


#muestra todas las deportivas
@app.route('/api/deportivas')
def mostrar_deportivas():
    db = abrirConexion()
    cursor = db.cursor(dictionary=True) 
    cursor.execute("SELECT nombre, marca, tipo, id_talles, precio FROM shoes WHERE tipo = 'deportiva'") 
    data = cursor.fetchall()
    cursor.close()
    db.close()
    
    return jsonify(data)  


#muestra todas las high-tops
@app.route('/api/high-tops')
def mostrar_highTops():
    db = abrirConexion()
    cursor = db.cursor(dictionary=True) 
    cursor.execute("SELECT nombre, marca, tipo, id_talles, precio FROM shoes WHERE tipo = 'high-top'") 
    data = cursor.fetchall()
    cursor.close()
    db.close()
    
    return jsonify(data) 


#muestra todas las running
@app.route('/api/running')
def mostrar_running():
    db = abrirConexion()
    cursor = db.cursor(dictionary=True) 
    cursor.execute("SELECT nombre, marca, tipo, id_talles, precio FROM shoes WHERE tipo = 'running'") 
    data = cursor.fetchall()
    cursor.close()
    db.close()
    
    return jsonify(data) 

if __name__ == "__main__":
    app.run(debug=True)