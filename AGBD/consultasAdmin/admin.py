import mysql.connector
from flask import Flask, g, jsonify
from dotenv import load_dotenv
import os

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

@app.teardown_appcontext #para no estar poniendo cerrarConexion en cada funcion
def cerrarConexion(error):
    db = g.pop('db', None)
    if db is not None:
        db.close()

#consulta para ver todos los clientes
@app.route('/api/clientes', methods=['GET'])
def get_shoes():
    db = abrirConexion()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM clientes")
    resultado = cursor.fetchall()  
    cursor.close()
    return {"shoes": resultado}
