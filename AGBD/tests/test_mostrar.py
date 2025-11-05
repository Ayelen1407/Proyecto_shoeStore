def test_mostrar_shoes(client):
    response = client.get("/api/shoes") #obtengo respuesta, lista de shoes
    assert response.status_code == 200
    data = response.get_json() #hago que la respuesta este en json
    assert len(data) > 0 #me aseguro que la lista o respuesta no este vacia
    producto = data[0]
    assert "id" in producto
    assert "name" in producto
    assert "type" in producto
    assert "marca" in producto
    assert "price" in producto
    assert "image" in producto
    #la palabra assert sirve para verificar que esta bien

def test_obtener_shoes_paginado(client):
    response = client.get("/api/shoes/paginado?page=1&limit=4") #con parametro
    assert response.status_code == 200
    data = response.get_json()
    assert "productos" in data
    assert "total_de_productos" in data
    assert "pagina" in data
    assert "total_de_paginas" in data
    assert data["pagina"] == 1 #me fijo si la pagina esta bien, osea si es 1
    assert len(data["productos"]) <= 4  #me fijo que no traiga más de 4 productos



