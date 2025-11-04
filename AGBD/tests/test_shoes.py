def test_mostrar_shoes(client):
    response = client.get("/api/shoes")
    assert response.status_code == 200
    data = response.get_json() #obtengo respuesta, lista de shoes
    assert isinstance(data, list) #verifico que sea una lista
    if len(data) > 0:  # si hay producto, verifico que tenga las claves esperadas   
        producto = data[0]
        assert "id" in producto
        assert "name" in producto
        assert "type" in producto
        assert "marca" in producto
        assert "price" in producto
        assert "image" in producto


#el profe me dijo que el isinstance no debia estar y tambien que no hace falta hacer un if
#entonces deberia arreglarlo      