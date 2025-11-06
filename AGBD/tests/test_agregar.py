def test_agregar_shoes(client):
    nuevo_shoe = {"nombre": "nike Air prueba","tipo": "deportiva","marca": "nike","precio": 150000,"id_talles": 2, "img_url": "https://example.com/nike_air.jpg"}
    response = client.post("/api/agregarShoes", json=nuevo_shoe)
    assert response.status_code == 201
    data = response.get_json()
    assert "mensaje" in data # me fijo si hay mensaje en data
    assert "Producto nike Air prueba agregado" in data["mensaje"]# me fijo el mensaje
    
#-------------------------5/11