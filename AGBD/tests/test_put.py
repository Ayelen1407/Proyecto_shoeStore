#-------------------5/11
def test_cambiar_precio(client):
    nuevo_shoe = {"nombre": "nike Air prueba","tipo": "deportiva","marca": "nike","precio": 150000,"id_talles": 2, "img_url": "https://example.com/nike_air.jpg"}
    response = client.post("/api/agregarShoes", json=nuevo_shoe)
    assert response.status_code == 201

    shoe_id = response.get_json().get("id")

    nuevo_precio = 130000
    response = client.put(f"/api/shoes/{shoe_id}", json={"precio": nuevo_precio})
    assert response.status_code == 200
    assert response.get_json()["mensaje"] == "Precio modificado"

    response = client.get(f"/api/shoes/{shoe_id}")
    data = response.get_json()
    assert int(data["precio"]) == nuevo_precio

    