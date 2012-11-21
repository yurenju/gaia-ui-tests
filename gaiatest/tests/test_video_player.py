# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

from gaiatest import GaiaTestCase


class TestVideoPlayer(GaiaTestCase):

    # Video player list/summary view
    _video_items_locator = ('css selector', 'ul#thumbnails li[data-name] img')

    def setUp(self):
        GaiaTestCase.setUp(self)


        # unlock the lockscreen if it's locked
        self.assertTrue(self.lockscreen.unlock())



        # launch the Gallery app
        self.app = self.apps.launch('Video')



    def test_play_video(self):

        self.wait_for_element_displayed(*self._video_items_locator)

        self.marionette.find_elements(*self._video_items_locator)[0].click()

        import time
        time.sleep(3)

        print self.marionette.page_source


    def tearDown(self):

        # close the app
        if self.app:
            self.apps.kill(self.app)

        GaiaTestCase.tearDown(self)
