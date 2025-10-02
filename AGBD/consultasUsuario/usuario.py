import mysql.connector
from flask import Flask, g, jsonify
from dotenv import load_dotenv
import os

# Carga las variables del .env
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

@app.teardown_appcontext #para no estar poniendo cerrarConexion en cada funcion
def cerrarConexion(error):
    db = g.pop('db', None)
    if db is not None:
        db.close()


#consulta para mostrar todas las zapatillas
@app.route('/api/zapatillas', methods=['GET'])
def mostrar_shoes():
   db = abrirConexion()
   cursor = db.cursor(dictionary=True) 
   cursor.execute("SELECT * FROM shoes")  
   resultados = cursor.fetchall()
   cursor.close()
   cerrarConexion()
   return {"shoes": resultados}


#muestra zapatillas por categoria
@app.route('/api/zapatillas/categoria/<string:categoria>', methods=['GET'])
def mostrar_zapatillas_por_categoria(categoria):
    db = abrirConexion()
    cursor = db.cursor(dictionary=True)  # dictionary=True devuelve filas como diccionarios (columna : valor)
    cursor.execute("SELECT * FROM shoes WHERE tipo = %s", (categoria,))  # productos es tu tabla
    resultados = cursor.fetchall()  # trae todas las filas/registros
    cursor.close()
    return jsonify({"shoes": resultados})


#muestra zapatillas por id
@app.route('/api/zapatillas/<int:id>', methods=['GET'])
def mostrar_zapatilla_por_id(id):
    db = abrirConexion()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM shoes WHERE id_shoes = %s", (id,))
    zapatilla = cursor.fetchone()
    cursor.close()

    if zapatilla:
        return jsonify(zapatilla)   # devuelve la zapatilla como objeto
    else:
        return jsonify({"error": "Zapatilla no encontrada"}), 404


#consulta para ver el contenido del carrito
@app.route('/api/carrito', methods=['GET'])
def ver_carrito():
    db = abrirConexion()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM carrito") #no tenemos esta tabla aun
    resultado = cursor.fetchall()  
    cursor.close()
    return {"shoes": resultado}

if __name__ == "__main__":
    app.run(debug=True)