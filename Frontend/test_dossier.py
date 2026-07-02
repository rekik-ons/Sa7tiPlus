import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def setup_driver():
    options = webdriver.ChromeOptions()
    options.add_experimental_option("detach", True)
    return webdriver.Chrome(options=options)
    
def test_create_dossier_s():

    driver = setup_driver()
    driver.get("http://localhost:4200/medecin/creer-dossier")

    driver.find_element(By.ID, "nom").send_keys("Ali")
    driver.find_element(By.ID, "prenom").send_keys("Ahmed")
    driver.find_element(By.ID, "allergie").send_keys("Aucune")
    driver.find_element(By.ID, "age").send_keys("30")
    driver.find_element(By.ID, "poids").send_keys("70")
    driver.find_element(By.ID, "taille").send_keys("180")
    driver.find_element(By.ID, "etat").send_keys("Bonne santé")
    driver.find_element(By.ID, "diagnostic").send_keys("RAS")
    driver.find_element(By.ID, "traitement").send_keys("Aucun")

    btn = driver.find_element(By.NAME, "enregistrer")
    driver.execute_script("arguments[0].scrollIntoView(true);", btn)
    driver.execute_script("arguments[0].click();", btn)

    time.sleep(2)

    assert "creer-dossier" in driver.current_url

    print("Dossier created successfully")
    driver.quit()
    
def test_create_dossier_f():
    driver = setup_driver()
    driver.get("http://localhost:4200/medecin/creer-dossier")

    driver.find_element(By.ID, "nom").send_keys("Ali")

    btn = driver.find_element(By.NAME, "enregistrer")
    driver.execute_script("arguments[0].scrollIntoView(true);", btn)
    driver.execute_script("arguments[0].click();", btn)

    assert "creer-dossier" in driver.current_url

    print("dossier creation failed")
    driver.quit()

def test_update_dossier_s():
    driver = setup_driver()
    driver.get("http://localhost:4200/medecin/modifier-dossier?id=1")

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "diagnostic"))
    )

    diag = driver.find_element(By.ID, "diagnostic")
    traitement = driver.find_element(By.ID, "traitement")
    description = driver.find_element(By.ID, "description")

    diag.clear()
    diag.send_keys("Grippe")

    traitement.clear()
    traitement.send_keys("Paracétamol")

    description.clear()
    description.send_keys("Patient stable")

    btn = driver.find_element(By.NAME, "enregistrer")
    driver.execute_script("arguments[0].scrollIntoView(true);", btn)
    driver.execute_script("arguments[0].click();", btn)

    
    WebDriverWait(driver, 10).until(EC.alert_is_present())
    alert = driver.switch_to.alert
    assert "succès" in alert.text
    alert.accept()

    print("Modification avec succès")
    driver.quit()

def test_update_dossier_f():
    driver = setup_driver()
    driver.get("http://localhost:4200/medecin/modifier-dossier?id=1")

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "diagnostic"))
    )

    driver.find_element(By.ID, "diagnostic").clear()

    btn = driver.find_element(By.NAME, "enregistrer")
    driver.execute_script("arguments[0].scrollIntoView(true);", btn)
    driver.execute_script("arguments[0].click();", btn)

    WebDriverWait(driver, 5).until(
        EC.url_contains("modifier-dossier")
    )

    assert "modifier-dossier" in driver.current_url

    print("Modification échouée")
    driver.quit()