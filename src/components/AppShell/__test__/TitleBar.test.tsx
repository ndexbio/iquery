import React from 'react'
import renderer from 'react-test-renderer'

import TitleBar from '../TitleBar'

it('Test title bar component', () => {
  const props = {
    uiState: {
      isSettingsOpen: false
    },
    search: {
      results: null

    }
  }
  const result = renderer.create(<TitleBar {...props} />).toJSON()
  expect(result).toMatchInlineSnapshot(`
    <header
      className="MuiPaper-root MuiPaper-elevation4 MuiAppBar-root MuiAppBar-positionFixed TitleBar-appBar-7 mui-fixed"
    >
      <div
        className="TitleBar-noWrap-10"
      >
        <div
          className="MuiToolbar-root MuiToolbar-regular"
        >
          <div
            aria-describedby={null}
            aria-label="NDEx_tooltip"
            className=""
            onBlur={[Function]}
            onFocus={[Function]}
            onMouseLeave={[Function]}
            onMouseOver={[Function]}
            onTouchEnd={[Function]}
            onTouchStart={[Function]}
            title="Search by Pathway Enrichment / Protein-Protein Interactions / Gene Association"
          >
            <button
              className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-text"
              disabled={false}
              onBlur={[Function]}
              onClick={[Function]}
              onDragLeave={[Function]}
              onFocus={[Function]}
              onKeyDown={[Function]}
              onKeyUp={[Function]}
              onMouseDown={[Function]}
              onMouseLeave={[Function]}
              onMouseUp={[Function]}
              onTouchEnd={[Function]}
              onTouchMove={[Function]}
              onTouchStart={[Function]}
              style={
                Object {
                  "left": "1em",
                  "position": "relative",
                  "textTransform": "none",
                }
              }
              tabIndex={0}
              type="button"
            >
              <span
                className="MuiButton-label"
              >
                <svg
                  aria-hidden="true"
                  className="MuiSvgIcon-root TitleBar-homeLogo-6"
                  focusable="false"
                  role="presentation"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
                  />
                </svg>
                <h6
                  className="MuiTypography-root MuiTypography-h6 MuiTypography-colorInherit MuiTypography-noWrap"
                >
                  NDEx Integrated Query
                </h6>
              </span>
              <span
                className="MuiTouchRipple-root"
              />
            </button>
          </div>
          <div />
          <div
            className="TitleBar-grow-2"
          />
          <div>
            <button
              aria-describedby={null}
              aria-label="Home"
              className="MuiButtonBase-root MuiIconButton-root"
              disabled={false}
              onBlur={[Function]}
              onClick={[Function]}
              onDragLeave={[Function]}
              onFocus={[Function]}
              onKeyDown={[Function]}
              onKeyUp={[Function]}
              onMouseDown={[Function]}
              onMouseLeave={[Function]}
              onMouseOver={[Function]}
              onMouseUp={[Function]}
              onTouchEnd={[Function]}
              onTouchMove={[Function]}
              onTouchStart={[Function]}
              tabIndex={0}
              title="NDEx"
              type="button"
            >
              <span
                className="MuiIconButton-label"
              >
                <img
                  alt="NDEx logo"
                  className="TitleBar-logo-5"
                  src="ndex-logo.svg"
                />
              </span>
              <span
                className="MuiTouchRipple-root"
              />
            </button>
            <p
              aria-describedby={null}
              className="MuiTypography-root MuiTypography-body1 MuiTypography-colorTextPrimary MuiTypography-noWrap MuiTypography-displayInline"
              onBlur={[Function]}
              onFocus={[Function]}
              onMouseLeave={[Function]}
              onMouseOver={[Function]}
              onTouchEnd={[Function]}
              onTouchStart={[Function]}
              style={
                Object {
                  "marginRight": "1em",
                }
              }
              title="Help"
            >
              <button
                aria-haspopup="true"
                className="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit"
                disabled={false}
                onBlur={[Function]}
                onClick={[Function]}
                onDragLeave={[Function]}
                onFocus={[Function]}
                onKeyDown={[Function]}
                onKeyUp={[Function]}
                onMouseDown={[Function]}
                onMouseLeave={[Function]}
                onMouseUp={[Function]}
                onTouchEnd={[Function]}
                onTouchMove={[Function]}
                onTouchStart={[Function]}
                tabIndex={0}
                type="button"
              >
                <span
                  className="MuiIconButton-label"
                >
                  <svg
                    aria-hidden="true"
                    className="MuiSvgIcon-root TitleBar-logo-5"
                    focusable="false"
                    role="presentation"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                    />
                  </svg>
                </span>
                <span
                  className="MuiTouchRipple-root"
                />
              </button>
            </p>
          </div>
        </div>
      </div>
    </header>
  `)
})
