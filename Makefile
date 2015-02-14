.SUFFIXES:
.SUFFIXES: .js .pegjs .css .scss .html .msc .mscin .msgenny .svg .png .jpg
RJS=node_modules/requirejs/bin/r.js
PLATO=node_modules/plato/bin/plato
MOCHA=node_modules/mocha/bin/mocha
MOCHA_FORK=node_modules/mocha/bin/_mocha
COVER=node node_modules/istanbul/lib/cli.js
COVER2REPORT=genhtml --no-source --branch-coverage --no-sort --rc genhtml_med_limit=50 --rc genhtml_hi_limit=80 --quiet --output-directory 
GIT=git
LINT=node_modules/jshint/bin/jshint --verbose --show-non-errors --extract auto
CSSLINT=node node_modules/csslint/cli.js --format=compact --quiet --ignore=ids
CJS2AMD=utl/commonjs2amd.sh
PNG2FAVICO=utl/png2favico.sh
RESIZE=utl/resize.sh
IOSRESIZE=utl/iosresize.sh
SEDVERSION=utl/sedversion.sh
NPM=npm
DOC=node node_modules/jsdoc/jsdoc.js --destination jsdoc

PRODDIRS=style style/themes font images script lib
LIB_SOURCES_WEB=src/lib/require.js \
	src/lib/screenfull.js
SCRIPT_SOURCES_WEB=src/script/ui-control/eventmap.js \
	src/script/ui-control/actions.js \
	src/script/chopper/chopper.js \
	src/script/chopper/chopper.js \
	src/script/utl/formatting.js \
	src/script/utl/paramslikker.js \
	src/script/utl/stopwatch.js \
	src/script/utl/browserutl.js
SOURCES_WEB=$(LIB_SOURCES_WEB) $(SCRIPT_SOURCES_WEB) 
FAVICONMASTER=src/images/wordywordy.png
FAVICONS=favicon.ico
VERSIONEMBEDDABLESOURCES=index.html script/wordywordy.js
SASS=node_modules/node-sass/bin/node-sass --output-style compressed
# SASS=node_modules/node-sass/bin/node-sass

.PHONY: help dev-build install checkout-gh-pages build-gh-pages deploy-gh-pages check mostlyclean clean noconsolestatements consolecheck lint cover prerequisites build-prerequisites-node report test

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
	@echo \ \-\> this is probably the target you want when hosting WordyWordy
	@echo 
	@echo clean
	@echo \ removes everything created by either install or dev-build
	@echo
	@echo \ \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-
	@echo

# production rules

%.html: src/%.html
	$(SEDVERSION) < $< > $@

%.css: %.scss
	$(SASS) $< $@

font/%: src/font/%
	cp -R $< $@

style/%.css: src/style/%.css
	cp $< $@

style/themes/%.css: src/style/themes/%.css
	cp $< $@

images/%: src/images/%
	cp -R $< $@

lib/%.js: src/lib/%.js
	cp -R $< $@

favicon.ico: $(FAVICONMASTER)
	$(PNG2FAVICO) $< $@

favicon-%.png: $(FAVICONMASTER)
	$(RESIZE) $< $@ 

iosfavicon-%.png: $(FAVICONMASTER)
	$(IOSRESIZE) $< $@ 

$(PRODDIRS):
	mkdir -p $@

# file targets dev

# file targets prod
index.html: $(PRODDIRS) \
	$(FAVICONS) \
	src/index.html \
	siteverification.id \
	tracking.id \
	tracking.host \
	lib/require.js \
	lib/screenfull.js \
	script/wordywordy.js \
	style/wordywordy.css \
	style/themes/057.css \
	style/themes/074.css \
	style/themes/220.css \
	style/themes/background.css \
	style/themes/day.css \
	style/themes/dyslexia-day.css \
	style/themes/dyslexia-high-contrast.css \
	style/themes/dyslexia-low-contrast.css \
	style/themes/dyslexia-night.css \
	style/themes/dyslexia-sepia.css \
	style/themes/high-contrast.css \
	style/themes/hv.css \
	style/themes/liberal.css \
	style/themes/low-contrast-fat-font.css \
	style/themes/low-contrast.css \
	style/themes/night.css \
	style/themes/progressive.css \
	style/themes/sepia-fat-font.css \
	style/themes/sepia.css \
	style/themes/zany.css \
	font/OpenDyslexic-Italic.otf \
	font/OpenDyslexicAlta-Regular.otf \
	font/Roboto-Italic.ttf \
	font/Roboto-Light.ttf \
	font/Roboto-LightItalic.ttf \
	font/Roboto-Regular.ttf \
	font/Roboto-Thin.ttf \
	font/Roboto-ThinItalic.ttf \
	font/controls.eot \
	font/controls.svg \
	font/controls.ttf \
	font/controls.woff \
	images/background.jpg

script/wordywordy.js: src/wordywordy.js 
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

src/style/wordywordy.css: src/style/wordywordy.scss

src/style/wordywordy.scss: src/style/_fonts.scss

src/wordywordy.js: src/script/utl/formatting.js \
	src/script/utl/paramslikker.js \
	src/script/utl/browserutl.js \
	src/script/ui-control/eventmap.js \
	src/script/ui-control/actions.js 

src/script/ui-control/eventmap.js: src/script/ui-control/actions.js

src/script/ui-control/actions.js: src/script/chopper/chopper.js \
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

lib/require.js: src/lib/require.js
	cp $< $@

# "phony" targets
build-prerequisites:
	$(NPM) install requirejs amdefine jshint plato mocha istanbul csslint node-sass

prerequisites: build-prerequisites

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
	$(LINT) $(SCRIPT_SOURCES_WEB) $(SCRIPT_SOURCES_NODE) src/index.html

cover: dev-build
	$(COVER) cover $(MOCHA_FORK) src/script/test/

coverage/lcov.info: cover

testcoverage-report/index.html: coverage/lcov.info
	$(COVER2REPORT) testcoverage-report $<

cover-report: testcoverage-report/index.html

install: index.html

publish: install cover-report
	
tag: 
	$(GIT) tag -a `cat VERSION` -m "tag release `cat VERSION`"
	$(GIT) push --tags

report: dev-build
	$(PLATO) -r -d platoreports -x "jquery|parser|test|cli|attic" src/script/

doc:
	$(DOC) $(SCRIPT_SOURCES_WEB) src/script/README.md

test: dev-build
	# $(MOCHA) -R spec src/script/test/
	$(MOCHA) -R dot src/script/test/

check: noconsolestatements lint test

somewhatclean:
	rm -rf index.html
	rm -rf jsdoc
	rm -rf coverage
	rm -rf $(PRODDIRS)
	rm -rf testcoverage-report

clean: somewhatclean
	rm -rf $(FAVICONS)
