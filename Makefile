.SUFFIXES:
.SUFFIXES: .js .pegjs .css .html .msc .mscin .msgenny .svg .png .jpg
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

PRODDIRS=style font images script lib
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
	#
# production rules

%.html: src/%.html
	$(SEDVERSION) < $< > $@

font/: src/font
	cp -R $< .

style/: src/style
	cp -R $< .

images/: src/images
	cp -R $< .

lib/: src/lib
	cp -R $< .

script:
	mkdir $@

favicon.ico: $(FAVICONMASTER)
	$(PNG2FAVICO) $< $@

favicon-%.png: $(FAVICONMASTER)
	$(RESIZE) $< $@ 

iosfavicon-%.png: $(FAVICONMASTER)
	$(IOSRESIZE) $< $@ 


# file targets dev


# file targets prod
index.html: $(PRODDIRS) \
	src/index.html \
	$(FAVICONS) \
	siteverification.id \
	tracking.id \
	tracking.host \
	script/wordywordy.js \
	style/wordywordy.css

script/wordywordy.js: src/wordywordy.js 
	$(RJS) -o baseUrl="./src/script" \
			name="wordywordy" \
			out=$@ \

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
	$(NPM) install requirejs jshint plato mocha istanbul csslint

prerequisites: build-prerequisites

dev-build: src/index.html

noconsolestatements:
	@echo "scanning for console statements (run 'make consolecheck' to see offending lines)"
	grep -r console src/index.html | grep -c console | grep ^0$$
	@echo ... ok

consolecheck:
	grep -r console src/index.html

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
