import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def setup_driver():
    options = webdriver.ChromeOptions()
    options.add_experimental_option("detach", True)
    return webdriver.Chrome(options=options)


def test_addUser_s():
    driver = setup_driver()
    driver.get("http://localhost:4200/add-user")
    driver.find_element(By.ID, "prenom").send_keys("admin_root")
    driver.find_element(By.ID, "nom").send_keys("admin_last")
    driver.find_element(By.ID, "cin").send_keys("12345678")
    driver.find_element(By.ID, "tel").send_keys("20120120")
    driver.find_element(By.ID, "email").send_keys("admin@gmail.com")
    driver.find_element(By.ID, "date").send_keys("2000-04-14")
    Select(driver.find_element(By.ID, "profil")).select_by_visible_text("Administrateur")
    driver.find_elements(By.NAME, "sexe")[0].click()

    btn = driver.find_element(By.NAME, "enregistrer")
    driver.execute_script("arguments[0].scrollIntoView(true);", btn)
    driver.execute_script("arguments[0].click();", btn)

    time.sleep(2)

    WebDriverWait(driver, 10).until(EC.alert_is_present())
    alert = driver.switch_to.alert
    assert "erreur" not in alert.text.lower(), f"Échec inattendu : {alert.text}"
    alert.accept()

    print("Add user success")
    driver.quit()


def test_addUser_f():
    driver = setup_driver()
    driver.get("http://localhost:4200/add-user")

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "prenom"))
    )

    driver.find_element(By.ID, "prenom").send_keys("admin_root")
    driver.find_element(By.ID, "nom").send_keys("admin_last")
    driver.find_element(By.ID, "tel").send_keys("20120120")
    driver.find_element(By.ID, "email").send_keys("admin@gmail.com")
    driver.find_element(By.ID, "date").send_keys("14-04-2000")
    Select(driver.find_element(By.ID, "profil")).select_by_visible_text("Médecin")
    driver.find_elements(By.NAME, "sexe")[0].click()

    btn = driver.find_element(By.NAME, "enregistrer")
    driver.execute_script("arguments[0].scrollIntoView(true);", btn)
    driver.execute_script("arguments[0].click();", btn)

    time.sleep(2)

    WebDriverWait(driver, 10).until(EC.alert_is_present())
    alert = driver.switch_to.alert
    alert.accept()

    assert "add-user" in driver.current_url
    print("Add user fail")
    driver.quit()