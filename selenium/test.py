import sys
import os
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException

BASE_URL = 'http://iquery.ndexbio.org'

if 'BASE_URL' in os.environ:
    BASE_URL = os.environ['BASE_URL']


class IQueryTestCase(unittest.TestCase):

    def setUp(self):
        self.browser = webdriver.Chrome()
        self.addCleanup(self.browser.quit)

    def test_page_title(self):
        self.browser.get(BASE_URL)
        self.assertIn('NDEx', self.browser.title)

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
        self.browser.get(BASE_URL)
        thebutton = None
        for element in self.browser.find_elements_by_class_name('MuiButtonBase-root'):
            try:
                imgele = element.find_element_by_class_name('jss9')
                if imgele is None:
                    continue
            except NoSuchElementException:
                continue
            if imgele.get_attribute('alt') == 'NDEx logo':
                thebutton = element
                break
        curwindow_name = self.browser.window_handles[0]
        self.assertEqual(1, len(self.browser.window_handles),
                         'There should only be 1 tab open. wtf : ' +
                         str(self.browser.window_handles))
        self.assertTrue(thebutton is not None,
                        'Could not find the button in upper right corner')

        res = thebutton.click()

        self.assertEqual(None, res, 'Expected None cause the click opens a new page')
        self.assertEqual(2, len(self.browser.window_handles),
                         'There should be 2 tabs open. wtf')

        for wname in self.browser.window_handles:
            if wname != curwindow_name:
                newtab = wname
                break

        # browser.switch_to.window_handles
        self.browser.switch_to.window(newtab)
        self.assertTrue(self.browser.title.startswith('NDEx WebApp v'))
        self.assertTrue(self.browser.current_url.startswith('https://www.ndexbio.org'))

    def test_click_hypoxia_query(self):
        """
        <button class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-text example-text MuiButton-colorInherit"
        tabindex="0" type="button">
        <span class="MuiButton-label">Hypoxia</span>
        <span class="MuiTouchRipple-root"></span></button>
        """
        self.browser.get(BASE_URL)
        thebutton = None
        for element in self.browser.find_elements_by_class_name('MuiButtonBase-root'):
            if element.tag_name != 'button':
                continue
            if element.text != 'HYPOXIA':
                continue
            thebutton = element

        curwindow_name = self.browser.window_handles[0]
        self.assertEqual(1, len(self.browser.window_handles),
                         'There should only be 1 tab open. wtf : ' +
                         str(self.browser.window_handles))
        self.assertTrue(thebutton is not None,
                        'Could not find the hypoxia button/link')

        hover = ActionChains(self.browser).move_to_element(thebutton).click(thebutton).perform()

        self.assertEqual(1, len(self.browser.window_handles),
                         'There should be 1 only tab open. wtf')
        self.assertIn('NDEx', self.browser.title)
        import time
        time.sleep(10)
        self.fail('Need to add logic to wait for query page to load '
                  'and verify the correct genes were queried')


if __name__ == '__main__':
    unittest.main(verbosity=2)
