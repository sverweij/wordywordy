.SUFFIXES:
.SUFFIXES: .js .pegjs .css .scss .html .msc .mscin .msgenny .svg .png .jpg
RJS=node_modules/requirejs/bin/r.js
MOCHA_FORK=node_modules/mocha/bin/_mocha
COVER=node node_modules/istanbul/lib/cli.js
COVER2REPORT=genhtml --no-source --branch-coverage --no-sort --rc genhtml_med_limit=50 --rc genhtml_hi_limit=80 --quiet --output-directory 
GIT=git
CSSLINT=node node_modules/csslint/cli.js --format=compact --quiet --ignore=ids
CJS2AMD=utl/commonjs2amd.sh
PNG2FAVICO=utl/png2favico.sh
RESIZE=utl/resize.sh
IOSRESIZE=utl/iosresize.sh
SEDVERSION=utl/sedversion.sh
NPM=npm
DOC=node node_modules/jsdoc/jsdoc.js --destination jsdoc

BUILDDIR=build
PRODDIRS=$(BUILDDIR)/style \
		 $(BUILDDIR)/style/themes \
		 $(BUILDDIR)/font \
		 $(BUILDDIR)/images \
		 $(BUILDDIR)/script \
		 $(BUILDDIR)/lib \
		 $(BUILDDIR)/samples
LIB_SOURCES_WEB=src/lib/require.js \
	src/lib/screenfull.js
SCRIPT_SOURCES_WEB=src/script/ui-control/eventmap.js \
	src/script/ui-control/actions.js \
	src/script/ui-control/constants.js \
	src/script/ui-control/themeswitcher.js \
	src/script/chopper/chopper.js \
	src/script/chopper/chopper.js \
	src/script/utl/formatting.js \
	src/script/utl/paramslikker.js \
	src/script/utl/stopwatch.js \
	src/script/utl/browserutl.js
SOURCES_WEB=$(LIB_SOURCES_WEB) $(SCRIPT_SOURCES_WEB) 
FAVICONMASTER=src/images/wordywordy.png
FAVICONS=$(BUILDDIR)/favicon.ico
VERSIONEMBEDDABLESOURCES=$(BUILDDIR)/index.html \
						 $(BUILDDIR)/script/wordywordy.js
SASS=node_modules/node-sass/bin/node-sass --output-style compressed
# SASS=node_modules/node-sass/bin/node-sass

.PHONY: help dev-build install checkout-gh-pages build-gh-pages deploy-gh-pages check mostlyclean clean noconsolestatements consolecheck lint cover prerequisites report test

help:
	@echo \ \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-
	@echo \| Just downloaded the WordyWordy sources? \|
	@echo \| \ First run \'make prerequisites\'  \ \ \ \ \ \ \ \ \|
	@echo \ \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-
	@echo
	@echo Most important build targets:
	@echo
	@echo dev-build
	@echo \ development build only
	@echo
	@echo check
	@echo \ runs the linter and executes all unit tests
	@echo 
	@echo install
	@echo \ creates the production version \(minified js, images, html\)
	@echo \ in the build directory
	@echo \ \-\> this is probably the target you want when hosting WordyWordy
	@echo 
	@echo clean
	@echo \ removes everything created by either install or dev-build
	@echo
	@echo \ \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-
	@echo

# production rules

$(BUILDDIR)/%.html: src/%.html
	$(SEDVERSION) < $< > $@

%.css: %.scss
	$(SASS) $< $@

$(BUILDDIR)/font/%: src/font/%
	cp -R $< $@

$(BUILDDIR)/style/%.css: src/style/%.css
	cp $< $@

$(BUILDDIR)/style/themes/%.css: src/style/themes/%.css
	cp $< $@

$(BUILDDIR)/images/%: src/images/%
	cp -R $< $@

$(BUILDDIR)/lib/%.js: src/lib/%.js
	cp -R $< $@

$(BUILDDIR)/samples/%.txt: samples/%.txt
	cp -R $< $@

$(BUILDDIR)/favicon.ico: $(FAVICONMASTER)
	$(PNG2FAVICO) $< $@

$(BUILDDIR)/favicon-%.png: $(FAVICONMASTER)
	$(RESIZE) $< $@ 

$(BUILDDIR)/iosfavicon-%.png: $(FAVICONMASTER)
	$(IOSRESIZE) $< $@ 

$(PRODDIRS):
	mkdir -p $@

# file targets dev

# file targets prod
$(BUILDDIR)/index.html: $(PRODDIRS) \
	$(FAVICONS) \
	src/index.html \
	siteverification.id \
	tracking.id \
	tracking.host \
	$(BUILDDIR)/lib/require.js \
	$(BUILDDIR)/lib/screenfull.js \
	$(BUILDDIR)/script/wordywordy.js \
	$(BUILDDIR)/style/wordywordy.css \
	$(BUILDDIR)/style/themes/057.css \
	$(BUILDDIR)/style/themes/074.css \
	$(BUILDDIR)/style/themes/220.css \
	$(BUILDDIR)/style/themes/background.css \
	$(BUILDDIR)/style/themes/day.css \
	$(BUILDDIR)/style/themes/dyslexia-day.css \
	$(BUILDDIR)/style/themes/dyslexia-high-contrast.css \
	$(BUILDDIR)/style/themes/dyslexia-low-contrast.css \
	$(BUILDDIR)/style/themes/dyslexia-night.css \
	$(BUILDDIR)/style/themes/dyslexia-sepia.css \
	$(BUILDDIR)/style/themes/high-contrast.css \
	$(BUILDDIR)/style/themes/hv.css \
	$(BUILDDIR)/style/themes/liberal.css \
	$(BUILDDIR)/style/themes/low-contrast-fat-font.css \
	$(BUILDDIR)/style/themes/low-contrast.css \
	$(BUILDDIR)/style/themes/night.css \
	$(BUILDDIR)/style/themes/progressive.css \
	$(BUILDDIR)/style/themes/sepia-fat-font.css \
	$(BUILDDIR)/style/themes/sepia.css \
	$(BUILDDIR)/style/themes/zany.css \
	$(BUILDDIR)/font/OpenDyslexic-Italic.otf \
	$(BUILDDIR)/font/OpenDyslexicAlta-Regular.otf \
	$(BUILDDIR)/font/Roboto-Italic.ttf \
	$(BUILDDIR)/font/Roboto-Light.ttf \
	$(BUILDDIR)/font/Roboto-LightItalic.ttf \
	$(BUILDDIR)/font/Roboto-Regular.ttf \
	$(BUILDDIR)/font/Roboto-Thin.ttf \
	$(BUILDDIR)/font/Roboto-ThinItalic.ttf \
	$(BUILDDIR)/font/controls.eot \
	$(BUILDDIR)/font/controls.svg \
	$(BUILDDIR)/font/controls.ttf \
	$(BUILDDIR)/font/controls.woff \
	$(BUILDDIR)/images/background.jpg \
	$(BUILDDIR)/samples/1984.txt \
	$(BUILDDIR)/samples/freedom.txt \
	$(BUILDDIR)/samples/intro.nl.txt \
	$(BUILDDIR)/samples/intro.txt \
	$(BUILDDIR)/samples/laozi.txt \
	$(BUILDDIR)/samples/thoughts.txt

$(BUILDDIR)/script/wordywordy.js: src/wordywordy.js 
	$(RJS) -o baseUrl="./src/script" \
			name="wordywordy" \
			out=$@ \

src/index.html: src/wordywordy.js \
	src/lib/require.js \
	src/style/wordywordy.css \
	src/style/themes/057.css \
	src/style/themes/074.css \
	src/style/themes/220.css \
	src/style/themes/background.css \
	src/style/themes/day.css \
	src/style/themes/dyslexia-day.css \
	src/style/themes/dyslexia-high-contrast.css \
	src/style/themes/dyslexia-low-contrast.css \
	src/style/themes/dyslexia-night.css \
	src/style/themes/dyslexia-sepia.css \
	src/style/themes/high-contrast.css \
	src/style/themes/hv.css \
	src/style/themes/liberal.css \
	src/style/themes/low-contrast-fat-font.css \
	src/style/themes/low-contrast.css \
	src/style/themes/night.css \
	src/style/themes/progressive.css \
	src/style/themes/sepia-fat-font.css \
	src/style/themes/sepia.css \
	src/style/themes/zany.css

src/style/wordywordy.css: src/style/wordywordy.scss \
	src/style/_fonts.scss

src/wordywordy.js: src/script/utl/formatting.js \
	src/script/utl/paramslikker.js \
	src/script/utl/browserutl.js \
	src/script/ui-control/eventmap.js \
	src/script/ui-control/actions.js \
	src/script/ui-control/constants.js 

src/script/ui-control/eventmap.js: src/script/ui-control/actions.js

src/script/ui-control/actions.js: src/script/chopper/chopper.js \
	src/script/ui-control/constants.js \
	src/script/ui-control/themeswitcher.js \
	src/script/utl/formatting.js \
	src/script/utl/stopwatch.js \
	src/script/utl/browserutl.js \
	src/lib/screenfull.js

src/script/chopper/chopper.js: src/script/utl/formatting.js

siteverification.id:
	@echo yoursiteverifactionidhere > $@

tracking.id:
	@echo yourtrackingidhere > $@

tracking.host:
	@echo auto > $@

VERSION:
	@echo 0.0.0 > $@

$(BUILDDIR)/lib/require.js: src/lib/require.js
	cp $< $@

$(BUILDDIR)/bookmarklet.js:
	cp src/bookmarklet.js $@

# "phony" targets

prerequisites:
	$(NPM) install

dev-build: src/index.html

noconsolestatements:
	@echo "scanning for console statements (run 'make consolecheck' to see offending lines)"
	grep -r console $(SCRIPT_SOURCES_WEB) $(SCRIPT_SOURCES_NODE) src/index.html | grep -c console | grep ^0$$
	@echo ... ok

consolecheck:
	grep -r console $(SCRIPT_SOURCES_WEB) $(SCRIPT_SOURCES_NODE) src/index.html

csslint:
	$(CSSLINT) src/style/*.css src/style/themes/*.css

lint:
	$(NPM) run lint

cover: dev-build
	$(NPM) run cover

coverage/lcov.info: cover

testcoverage-report/index.html: coverage/lcov.info
	$(COVER2REPORT) testcoverage-report $<

cover-report: testcoverage-report/index.html

install: $(BUILDDIR)/index.html $(BUILDDIR)/bookmarklet.js

publish: install
	cd $(BUILDDIR)
	$(GIT) add .
	$(GIT) commit -m "build `cat ../VERSION`"
	$(GIT) push origin gh-pages
	
tag: 
	$(GIT) tag -a `cat VERSION` -m "tag release `cat VERSION`"
	$(GIT) push --tags

report: dev-build
	$(NPM) run plato

doc:
	$(DOC) $(SCRIPT_SOURCES_WEB) src/script/README.md

test: dev-build
	$(NPM) run test
	
nsp:
	$(NPM) run nsp
	
outdated:
	$(NPM) outdated

check: noconsolestatements lint test

fullcheck: check outdated nsp

update-dependencies:
	$(NPM) run npm-check-updates
	$(NPM) install
	$(GIT) diff package.json

somewhatclean:
	rm -rf $(BUILDDIR)/index.html
	rm -rf jsdoc
	rm -rf coverage
	rm -rf $(PRODDIRS)
	rm -rf testcoverage-report

clean: somewhatclean
	rm -rf $(FAVICONS)
