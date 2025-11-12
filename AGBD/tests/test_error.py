#------------5/11
def test_agregar_shoe_falta_campo(client):
    nuevo_shoe = {
        "nombre": "Nike Air",
        "tipo": "deportiva",
        # "marca": "nike", ejemplo
        "precio": 150000,
        "id_talles": 2,
        "img_url": "https://example.com/nike_air.jpg"
    }

    response = client.post("/api/agregarShoes", json=nuevo_shoe)
    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data
    assert "marca" in data["error"]  # el mensaje menciona el campo faltante

