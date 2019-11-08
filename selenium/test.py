import sys
import os
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec

NDEX_URL = 'https://www.ndexbio.org'
BASE_URL = 'http://iquery.ndexbio.org'

if 'BASE_URL' in os.environ:
    BASE_URL = os.environ['BASE_URL']

if 'NDEX_URL' in os.environ:
    NDEX_URL = os.environ['NDEX_URL']


class IQueryTestCase(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(30)
        self.addCleanup(self.driver.quit)

    def test_page_title(self):
        self.driver.get(BASE_URL)
        self.assertIn('NDEx', self.driver.title)

    def test_click_ndexicon_top_right(self):
        """
        <button class="MuiButtonBase-root MuiIconButton-root"
        tabindex="0" type="button" aria-label="Home"
        title="NDEx">
        <span class="MuiIconButton-label">
        <img alt="NDEx logo" src="/static/media/ndex-logo.04d7bf44.svg" class="jss9">
        </span><span class="MuiTouchRipple-root"></span>
        </button>
        :return: 
        """
        self.driver.get(BASE_URL)

        thebutton = self.driver.find_element(By.CSS_SELECTOR, "div:nth-child(4) > .MuiIconButton-root")

        curwindow_name = self.driver.window_handles[0]
        self.assertEqual(1, len(self.driver.window_handles),
                         'There should only be 1 tab open. wtf : ' +
                         str(self.driver.window_handles))
        self.assertTrue(thebutton is not None,
                        'Could not find the button in upper right corner')

        res = thebutton.click()

        self.assertEqual(None, res, 'Expected None cause the click opens a new page')
        self.assertEqual(2, len(self.driver.window_handles),
                         'There should be 2 tabs open. wtf')

        for wname in self.driver.window_handles:
            if wname != curwindow_name:
                newtab = wname
                break

        # browser.switch_to.window_handles
        self.driver.switch_to.window(newtab)
        self.assertTrue(self.driver.title.startswith('NDEx WebApp v'))
        self.assertTrue(self.driver.current_url.startswith(NDEX_URL))

    def test_click_hypoxia_query(self):
        """
        <button class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-text example-text MuiButton-colorInherit"
        tabindex="0" type="button">
        <span class="MuiButton-label">Hypoxia</span>
        <span class="MuiTouchRipple-root"></span></button>
        """
        self.driver.get(BASE_URL)
        thebutton = None
        for element in self.driver.find_elements_by_class_name('MuiButtonBase-root'):
            if element.tag_name != 'button':
                continue
            if element.text != 'HYPOXIA':
                continue
            thebutton = element

        self.assertEqual(1, len(self.driver.window_handles),
                         'There should only be 1 tab open. wtf : ' +
                         str(self.driver.window_handles))
        self.assertTrue(thebutton is not None,
                        'Could not find the hypoxia button/link')

        # hover over the Hypoxia button and then click it, seems to be the only way
        # to get the button to work
        ActionChains(self.driver).move_to_element(thebutton).click(thebutton).perform()

        wait = WebDriverWait(self.driver, 30)

        first_entry = wait.until(ec.visibility_of_element_located((By.CSS_SELECTOR,
                                                                   ".Mui-selected td > .MuiTypography-root:nth-child(1)")))

        self.assertEqual(1, len(self.driver.window_handles),
                         'There should be 1 only tab open. wtf')
        self.assertIn('NDEx', self.driver.title)

    def test_click_deathreceptors_query(self):
        """
        <button class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-text example-text MuiButton-colorInherit"
        tabindex="0" type="button">
        <span class="MuiButton-label">Hypoxia</span>
        <span class="MuiTouchRipple-root"></span></button>
        """
        self.driver.get(BASE_URL)
        thebutton = None
        for element in self.driver.find_elements_by_class_name('MuiButtonBase-root'):
            if element.tag_name != 'button':
                continue
            if element.text != 'DEATH RECEPTORS':
                continue
            thebutton = element

        self.assertEqual(1, len(self.driver.window_handles),
                         'There should only be 1 tab open. wtf : ' +
                         str(self.driver.window_handles))
        self.assertTrue(thebutton is not None,
                        'Could not find the death receptors button/link')

        # hover over the death receptors button and then click it, seems to be the only way
        # to get the button to work
        ActionChains(self.driver).move_to_element(thebutton).click(thebutton).perform()

        wait = WebDriverWait(self.driver, 30)

        first_entry = wait.until(ec.visibility_of_element_located((By.CSS_SELECTOR,
                                                                   ".Mui-selected td > .MuiTypography-root:nth-child(1)")))

        self.assertEqual(1, len(self.driver.window_handles),
                         'There should be 1 only tab open. wtf')
        self.assertIn('NDEx', self.driver.title)

    def test_click_reactiveoxygen_query(self):
        """
        <button class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-text example-text MuiButton-colorInherit"
        tabindex="0" type="button">
        <span class="MuiButton-label">Hypoxia</span>
        <span class="MuiTouchRipple-root"></span></button>
        """
        self.driver.get(BASE_URL)
        thebutton = None
        for element in self.driver.find_elements_by_class_name('MuiButtonBase-root'):
            if element.tag_name != 'button':
                continue
            if element.text != 'REACTIVE OXYGEN SPECIES':
                continue
            thebutton = element

        self.assertEqual(1, len(self.driver.window_handles),
                         'There should only be 1 tab open. wtf : ' +
                         str(self.driver.window_handles))
        self.assertTrue(thebutton is not None,
                        'Could not find the reactive oxygen button/link')

        # hover over the reactive oxygen button and then click it, seems to be the only way
        # to get the button to work
        ActionChains(self.driver).move_to_element(thebutton).click(thebutton).perform()

        wait = WebDriverWait(self.driver, 30)

        first_entry = wait.until(ec.visibility_of_element_located((By.CSS_SELECTOR,
                                                                   ".Mui-selected td > .MuiTypography-root:nth-child(1)")))

        self.assertEqual(1, len(self.driver.window_handles),
                         'There should be 1 only tab open. wtf')
        self.assertIn('NDEx', self.driver.title)

    def test_click_coxsackievirus_query(self):
        """
        <button class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-text example-text MuiButton-colorInherit"
        tabindex="0" type="button">
        <span class="MuiButton-label">Hypoxia</span>
        <span class="MuiTouchRipple-root"></span></button>
        """
        self.driver.get(BASE_URL)
        thebutton = None
        for element in self.driver.find_elements_by_class_name('MuiButtonBase-root'):
            if element.tag_name != 'button':
                continue
            if element.text != 'COXSACKIE VIRUS-HUMAN':
                continue
            thebutton = element

        self.assertEqual(1, len(self.driver.window_handles),
                         'There should only be 1 tab open. wtf : ' +
                         str(self.driver.window_handles))
        self.assertTrue(thebutton is not None,
                        'Could not find the coxsackie virus button/link')

        # hover over the coxsackie virus button and then click it, seems to be the only way
        # to get the button to work
        ActionChains(self.driver).move_to_element(thebutton).click(thebutton).perform()

        wait = WebDriverWait(self.driver, 30)

        first_entry = wait.until(ec.visibility_of_element_located((By.CSS_SELECTOR,
                                                                   ".Mui-selected td > .MuiTypography-root:nth-child(1)")))

        self.assertEqual(1, len(self.driver.window_handles),
                         'There should be 1 only tab open. wtf')
        self.assertIn('NDEx', self.driver.title)



if __name__ == '__main__':
    unittest.main(verbosity=2)
