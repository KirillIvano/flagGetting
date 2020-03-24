from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from time import sleep
import sys

name = sys.argv[1] 

driver = webdriver.Opera(executable_path='./operadriver.exe')
driver.get('https://events.webinar.ru/19563399/3590720')

form_element = driver.find_element_by_id('name')
form_element.send_keys(name)
form_element.send_keys(u'\ue007')

element = WebDriverWait(driver, 15).until(
    EC.presence_of_element_located((By.CLASS_NAME, "Reaction__rippleContainer___gaQaA"))
)

hot = driver.find_elements_by_class_name("Reaction__rippleContainer___gaQaA")[0]
for i in range(400):
    hot.click()
    sleep(.1)

