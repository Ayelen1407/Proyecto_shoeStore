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
        
#muestra tabla shoes. /api porque se conecta con lo de fede
@app.route('/api/shoes', methods=['GET'])
def mostrar_shoes():
   db = abrirConexion()
   cursor = db.cursor(dictionary=True)  # dictionary=True devuelve filas como diccionarios (columna : valor)
   cursor.execute("SELECT * FROM shoes")  # productos es tu tabla
   resultados = cursor.fetchall()  # trae todas las filas/registros
   cursor.close()
   cerrarConexion()
   return {"shoes": resultados}  #devolve los resultados como texto

#muestra tabla clientes
@app.route('/clientes', methods=['GET'])
def mostrar_clientes():
   db = abrirConexion()
   cursor = db.cursor(dictionary=True)
   cursor.execute("SELECT * FROM clientes") 
   resultados = cursor.fetchall()
   cursor.close()
   cerrarConexion()
   return {"clientes": resultados}

#muestra tabla empleados
@app.route('/empleados', methods=['GET'])
def mostrar_empleados():
   db = abrirConexion()
   cursor = db.cursor(dictionary=True)
   cursor.execute("SELECT * FROM empleados") 
   resultados = cursor.fetchall() 
   cursor.close()
   cerrarConexion()
   return {"clientes": resultados}

#muestra tabla "cantidad_talles"
@app.route('/talles', methods=['GET'])
def mostrar_cantidad_Talles():
   db = abrirConexion()
   cursor = db.cursor(dictionary=True)
   cursor.execute("SELECT * FROM cantidad_talles") 
   resultados = cursor.fetchall() 
   cursor.close()
   cerrarConexion()
   return {"cantidad_talles": resultados}




#inserta/agrega datos en la tabla "cantidad talles".
@app.route('/agregarTalle', methods=['POST'])
def agregar_talle():
   data = request.json
   talle = data['talle']
   db = abrirConexion()
   cursor = db.cursor()
   cursor.execute("INSERT INTO cantidad_talles (talle) VALUES (%s)", (talle,))
   db.commit()
   cursor.close()
   cerrarConexion()
   return {"mensaje": "talle agregado"}

#inserta/agrega datos en la tabla shoes
@app.route('/agregarShoes', methods = ['POST'])
def agregar_shoes():
   data = request.json
   nombre = data['nombre']
   tipo = data['tipo']
   marca = data['marca']
   precio = data['precio']
   id_talles = data['id_talles']
   db = abrirConexion()
   cursor = db.cursor()
   cursor.execute("INSERT INTO shoes (nombre,tipo,marca,precio,id_talles) VALUES (%s,%s,%s,%s,%s)", (nombre,tipo,marca,precio,id_talles))
   db.commit()  # confirma los cambios en la base
   cursor.close()
   cerrarConexion()
   return {"mensaje": f"Producto {nombre} agregado"}

#inserta/agrega datos en la tabla clientes
@app.route('/agregarClientes', methods = ['POST'])
def agregar_cliente():
   data = request.json
   nombre = data['nombre']
   apellido = data['apellido']
   gasto = data['gasto']
   direccion = data['direccion']
   email = data['email']
   numero = data['numero']
   id_genero = data['id_genero']
   id_shoes = data['id_shoes']
   id_empleados = data['id_empleados']
   db = abrirConexion()
   cursor = db.cursor()
   cursor.execute("INSERT INTO clientes (nombre,apellido,gasto,direccion,email,numero,id_genero,id_shoes,id_empleados) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)", (nombre, apellido, gasto,direccion,email,numero,id_genero,id_shoes,id_empleados))
   db.commit()
   cursor.close()
   cerrarConexion()
   return {"mensaje": f"Cliente {apellido} agregado"}

#inserta/agrega datos en la tabla empleados
@app.route('/agregarEmpleado', methods = ['POST'])
def agregar_empleado():
   data = request.json
   nombre = data['nombre']
   apellido = data['apellido']
   edad = data['edad']
   puesto = data['puesto']
   db = abrirConexion()
   cursor = db.cursor()
   cursor.execute("INSERT INTO empleados (nombre,apellido,edad,puesto) VALUES (%s,%s,%s,%s)", (nombre, apellido, edad, puesto))
   db.commit()
   cursor.close()
   cerrarConexion()
   return {"mensaje": f"Empleado {apellido} agregado"}



#AYE
#Consulta para obtener todos los clientes
@app.route('/clientes', methods=['GET'])
def get_shoes():
    db = abrirConexion()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM clientes")
    resultado = cursor.fetchall()
    
    cursor.close()
    db.close()
    return {"shoes": resultado}

#Consulta para eliminar un dato
@app.route('/api/delete/<int:id>', methods=['DELETE'])
def delete_shoe(id):
    db = abrirConexion()
    cursor = db.cursor()
    sql = ("DELETE FROM clientes WHERE id= %s")
    val = (id,)
    cursor.execute(sql, val)
    db.commit()
    filas_afectadas = cursor.rowcount
    cursor.close()
    db.close()
    return jsonify({"eliminados": filas_afectadas})

if __name__ == "__main__":
    app.run(debug=True)