/**
 * A browser that implements paging of the UI.
 */
class PagingBrowser {

    /**
     * Trigger the browser window to page down.
     */
    async pageDown() {


    }

    /**
     * Get the current state of the page. This is called as an atomic method
     * to prevent the page reloading and resizing between calculating various
     * fields.
     *
     * We return a dict with the following properties:
     *
     * scrollPosition:
     *
     * The scroll position as a point (x,y)
     *
     * This corresponds to:
     *
     *  x: window.scrollX
     *  y: window.scrollY
     *
     * scrollBox:
     *
     * Get the scroll box size in width and height.
     *
     * This corresponds to:
     *
     *  width: document.body.scrollWidth
     *  height: document.body.scrollHeight
     *
     *  viewportBox:
     *
     * The size of the viewport in width and height.
     *
     * This corresponds to:
     *
     * - window.innerWidth
     * - window.innerHeight
     *
     * @return {Promise<PagingState>}
     */
    async state() {
        throw new Error("not implemented");
    }

    /**
     * Compute the next scroll position as if the user was paging down.
     *
     * @return {Point}
     */
    computePageDownScrollPosition(state) {

        let maxScrollPositions = {
            x: state.scrollBox.width - state.viewportBox.width,
            y: state.scrollBox.height - state.viewportBox.height
        };

        let result = {
            // x is always zero as we are not scrolling horizontally for now.
            x: 0,

            y: Math.min(state.scrollPosition.y + (state.viewportBox.height * 0.9), state.scrollBox.height)
        }

    }

    /**
     *
     * @param state {PagingState}
     * @return {Point}
     */
    computePageDownScrollPosition(state) {

        let maxScrollPositions = this.computeMaxScrollPositions(state);

        let result = {
            // x is always zero as we are not scrolling horizontally for now.
            x: 0,
            y: Math.min(state.scrollPosition.y + (state.viewportBox.height * 0.9), maxScrollPositions.y)
        }

    }

    /**
     *
     * @param state {PagingState}
     * @return {Point}
     */
    computeMaxScrollPositions(state) {

        return {
            x: state.scrollBox.width - state.viewportBox.width,
            y: state.scrollBox.height - state.viewportBox.height
        };

    }

    /**
     * Factor in the current scrollPosition, scrollBox, and viewportBox to determine
     * the percentage of the page that is scrolled for the width and height
     * dimensions.
     *
     * @return {Promise<BasicBox>}
     */
    async visualScrollPercentage() {

        let state = await this.state();

        return {
            width: PagingBrowser.perc(state.scrollPosition.x + state.viewportBox.width, state.scrollBox.width),
            height: PagingBrowser.perc(state.scrollPosition.y + state.viewportBox.height, state.scrollBox.height)
        };

    }

    /**
     * Percentage with upper bound of 100.
     */
    static perc(n, d) {
        return Math.min(100 * (Math.ceil(n) / d), 100);
    }

}

module.exports.PagingBrowser = PagingBrowser;
