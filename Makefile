.SUFFIXES:
.SUFFIXES: .js .pegjs .css .scss .html .svg .png .jpg
RJS=node_modules/requirejs/bin/r.js
MOCHA_FORK=node_modules/mocha/bin/_mocha
COVER=node node_modules/istanbul/lib/cli.js
COVER2REPORT=genhtml --no-source --branch-coverage --no-sort --rc genhtml_med_limit=50 --rc genhtml_hi_limit=80 --quiet --output-directory
GIT=git
GIT_CURRENT_BRANCH=$(shell utl/get_current_git_branch.sh)
GIT_DEPLOY_FROM_BRANCH=master
CSSLINT=node node_modules/csslint/cli.js --format=compact --quiet --ignore=ids
CJS2AMD=utl/commonjs2amd.sh
PNG2FAVICO=utl/png2favico.sh
RESIZE=utl/resize.sh
IOSRESIZE=utl/iosresize.sh
SEDVERSION=utl/sedversion.sh
NPM=npm
MAKEDEPEND=node_modules/.bin/js-makedepend
MINIFY=node_modules/.bin/uglifyjs

ifeq ($(GIT_DEPLOY_FROM_BRANCH), $(GIT_CURRENT_BRANCH))
	BUILDDIR=build
else
	BUILDDIR=build/branches/$(GIT_CURRENT_BRANCH)
endif
PRODDIRS=$(BUILDDIR)/style \
		 $(BUILDDIR)/style/themes \
		 $(BUILDDIR)/font \
		 $(BUILDDIR)/images \
		 $(BUILDDIR)/script \
		 $(BUILDDIR)/lib \
		 $(BUILDDIR)/samples
GENERATED_SOURCES=src/style/wordywordy.css
LIB_SOURCES_WEB=src/lib/require.js \
	src/lib/screenfull.js
SOURCES_WEB=$(LIB_SOURCES_WEB) $(SCRIPT_SOURCES_WEB)
FAVICONMASTER=src/images/wordywordy.png
FAVICONS=$(BUILDDIR)/favicon.ico
SASS=node_modules/node-sass/bin/node-sass --output-style compressed

.PHONY: help dev-build install  deploy-gh-pages check fullcheck  mostlyclean clean noconsolestatements consolecheck lint cover prerequisites report test update-dependencies run-update-dependencies

help:
	@echo " -----------------------------------------"
	@echo "| Just downloaded the WordyWordy sources? |"
	@echo "|  First run 'make prerequisites'         |"
	@echo " -----------------------------------------"
	@echo
	@echo "Most important build targets:"
	@echo
	@echo "dev-build"
	@echo " development build only"
	@echo
	@echo "check"
	@echo " runs the linter and all unit tests"
	@echo
	@echo "install"
	@echo " creates the production version (minified"
	@echo " js, images, html) in the build directory"
	@echo " -> this is probably the target you want"
	@echo "    when hosting WordyWordy"
	@echo
	@echo "clean"
	@echo " removes everything created by either"
	@echo " install or dev-build"
	@echo
	@echo " -----------------------------------------"
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

src/lib/require.js: node_modules/requirejs/require.js
	$(MINIFY) $< -m -c > $@

$(PRODDIRS):
	mkdir -p $@

src/lib/screenfull.js: node_modules/screenfull/dist/screenfull.js
	cp $< $@

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
	$(BUILDDIR)/style/themes/night-fat-font.css \
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

$(BUILDDIR)/script/wordywordy.js: $(SOURCES_WEB)
	$(RJS) -o baseUrl="./src/script" \
			name="wordywordy" \
			out=$@.tmp
	$(SEDVERSION) < $@.tmp > $@
	rm $@.tmp

src/index.html: $(SOURCES_WEB) $(GENERATED_SOURCES)

src/style/wordywordy.css: src/style/wordywordy.scss \
	src/style/_fonts.scss

src/script/ui-control/themeswitcher.js: \
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

siteverification.id:
	@echo yoursiteverifactionidhere > $@

tracking.id:
	@echo yourtrackingidhere > $@

tracking.host:
	@echo auto > $@

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

deploy-gh-pages: install
	@echo Deploying build `utl/getver` to $(BUILDDIR)
	$(GIT) -C $(BUILDDIR) add --all .
	$(GIT) -C $(BUILDDIR) commit -m "build `utl/getver`"
	$(GIT) -C $(BUILDDIR) push origin gh-pages
	$(GIT) -C $(BUILDDIR) status

tag:
	$(GIT) tag -a `utl/getver` -m "tag release `utl/getver`"
	$(GIT) push --tags

depend:
	$(MAKEDEPEND) --system amd --flat-define SCRIPT_SOURCES_WEB src/script/wordywordy.js

static-analysis: dev-build
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

update-dependencies: run-update-dependencies clean-generated-sources test nsp
	$(GIT) diff package.json

run-update-dependencies:
	$(NPM) run npm-check-updates
	$(NPM) install

clean-generated-sources:
	rm -rf $(GENERATED_SOURCES)

somewhatclean: clean-generated-sources
	rm -rf $(BUILDDIR)/index.html
	rm -rf coverage
	rm -rf $(PRODDIRS)
	rm -rf testcoverage-report

clean: somewhatclean
	rm -rf $(FAVICONS)

# DO NOT DELETE THIS LINE -- js-makedepend depends on it.

# amd dependencies
SCRIPT_SOURCES_WEB=src/script/wordywordy.js \
	src/lib/screenfull.js \
	src/script/chopper/chopper.js \
	src/script/ui-control/actions.js \
	src/script/ui-control/constants.js \
	src/script/ui-control/eventmap.js \
	src/script/ui-control/themeswitcher.js \
	src/script/utl/browserutl.js \
	src/script/utl/formatting.js \
	src/script/utl/gaga.js \
	src/script/utl/paramslikker.js \
	src/script/utl/stopwatch.js
