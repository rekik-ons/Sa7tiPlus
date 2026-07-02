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

def test_s_auth():
    driver = setup_driver()
    driver.get("http://localhost:4200/connexion")

    driver.find_element(By.ID, "login").send_keys("admin_root")
    driver.find_element(By.ID, "pwd").send_keys("admin_pass_2026")
    driver.find_element(By.ID, "connect").click()

    time.sleep(2)
    assert "connexion" not in driver.current_url
    print("Authentification success")
    driver.quit()

def test_f_auth():
    driver = setup_driver()
    driver.get("http://localhost:4200/connexion")

    driver.find_element(By.ID, "login").send_keys("ahmed")
    driver.find_element(By.ID, "pwd").send_keys("123456789")
    driver.find_element(By.ID, "connect").click()

    time.sleep(2)

    WebDriverWait(driver, 10).until(EC.alert_is_present())
    alert = driver.switch_to.alert
    assert "incorrect" in alert.text.lower()
    alert.accept()

    assert "connexion" in driver.current_url
    print("Authentification fail")
    driver.quit()