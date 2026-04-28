import time
from selenium import webdriver
from selenium.webdriver.common.by import By 
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select  # Needed for dropdowns

def test_s_auth():
    options = webdriver.ChromeOptions()
    options.add_experimental_option("detach", True)
    driver = webdriver.Chrome(options=options)

    driver.get("http://localhost:4200/connexion")
    userName = driver.find_element(By.ID, "login")
    passWord = driver.find_element(By.ID, "pwd")
    btn = driver.find_element(By.ID, "connect")

    userName.send_keys("admin_root")
    time.sleep(2)
    passWord.clear()
    passWord.send_keys("admin_pass_2026")
    time.sleep(2)
    btn.click()
    
    assert "Bienvenue" in driver.current_url
    driver.quit()

def test_f_auth():
    options = webdriver.ChromeOptions()
    options.add_experimental_option("detach", True)
    driver = webdriver.Chrome(options=options)

    driver.get("http://localhost:4200/connexion")
    userName = driver.find_element(By.ID, "login")
    passWord = driver.find_element(By.ID, "pwd")
    btn = driver.find_element(By.ID, "connect")

    userName.send_keys("ahmed")
    time.sleep(2)
    passWord.clear()
    passWord.send_keys("123456789")
    time.sleep(2)
    btn.click()
    
    # Logic: if authentication fails, we should still be on the login page
    assert "connexion" in driver.current_url
    driver.quit()

def test_addUser_s():
    options = webdriver.ChromeOptions()
    options.add_experimental_option("detach", True)
    driver = webdriver.Chrome(options=options)

    driver.get("http://localhost:4200/add-user")
    
    # Fill fields
    driver.find_element(By.ID, "prenom").send_keys("admin_root")
    driver.find_element(By.ID, "nom").send_keys("admin_last")
    driver.find_element(By.ID, "cin").send_keys("12345678")
    driver.find_element(By.ID, "tel").send_keys("20120120")
    driver.find_element(By.ID, "email").send_keys("admin@gmail.com")
    driver.find_element(By.ID, "date").send_keys("14-04-2000")
    
    # CORRECT WAY to handle dropdowns:
    dropdown = Select(driver.find_element(By.ID, "profil"))
    dropdown.select_by_visible_text("Administrateur")
    
    driver.find_element(By.NAME, "sexe").click()
    
    time.sleep(2)
    driver.find_element(By.NAME, "enregistrer").click()
    
    assert "Bienvenue Admin" in driver.current_url
    driver.quit()