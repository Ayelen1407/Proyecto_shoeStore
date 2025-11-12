#--------------5/11
def test_delete_shoes(client):
    response = client.get('/api/shoes')
    data = response.get_json()
    repetidas = [shoe for shoe in data if shoe["name"] == "nike Air prueba"]
    for shoe in repetidas:
        delete = client.delete(f"/api/delete/{shoe['id']}")
        assert delete.status_code == 200
