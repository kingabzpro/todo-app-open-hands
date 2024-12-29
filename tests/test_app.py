from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert "Todo List" in response.text

# Additional tests for JavaScript functionality would require a framework like Selenium or Puppeteer
