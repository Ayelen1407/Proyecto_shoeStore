#conexion

import mysql.connector
from flask import Flask, g, jsonify

app = Flask(__name__)

def abrirConexion():
    if 'db' not in g:
        g.db = mysql.connector.connect(
            host="10.9.120.5",      # IP de tu servidor
            user="shoes",           # tu usuario de MySQL
            password="shoes1234",   # tu contraseña
            database="shoeStore",   # tu base en phpMyAdmin
            port=3306               #puerto
        )
    return g.db

def cerrarConexion(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()
        
#muestra producto 
@app.route('/shoes')
def mostrar_shoes():
    db = abrirConexion()
    cursor = db.cursor(dictionary=True)  # dictionary=True devuelve filas como diccionarios
    cursor.execute("SELECT * FROM shoes")  # productos es tu tabla
    resultados = cursor.fetchall()  # trae todas las filas
    cursor.close()
    cerrarConexion()
    
    return jsonify(resultados)  # por ahora devolvemos los resultados como texto

@app.route('/agregar_shoes/<int:id_shoes>/<int:id_talles>/<marca>/<nombre>/<precio>/<tipo>', )
def agregar_shoes(id_shoes, id_talles, marca, nombre, precio, tipo):
    db = abrirConexion()
    cursor = db.cursor()
    sql = "INSERT INTO productos (id_shoes, id_talles, marca, nombre, precio, tipo) VALUES (%s, %s, %s, %s, %s, %s)"
    valores = (id_shoes, id_talles, marca, nombre, precio, tipo)
    cursor.execute(sql, valores)
    db.commit()  # confirma los cambios en la base
    cursor.close()
    cerrarConexion()
    
    return f"Producto {nombre} agregado correctamente."


if __name__ == "__main__":
    app.run(debug=True)

#Consulta para obtener todos los clientes
@app.route('/clientes', methods=['GET'])
def get_shoes():
    db = abrirConexion()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM clientes")
    resultado = cursor.fetchall()
    
    cursor.close()
    cerrarConexion()
    return {"shoes": resultado}

if __name__ == "__main__":
    app.run(debug=True)

#Consulta para eliminar un dato
@app.route('/delete/<int:id>', methods=['DELETE'])
def delete_shoe(id):
    db = abrirConexion()
    cursor = db.cursor()
    sql = ("DELETE FROM shoes WHERE id= %s")
    cursor.execute(sql, (id,))
    db.commit()

    cursor.close()
    cerrarConexion()
    print(cursor.rowcount, "registro eliminado.")
    return {"mensaje": f"Se elimino el registro {id} correctamente"}