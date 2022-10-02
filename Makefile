.SUFFIXES:
.SUFFIXES: .js .pegjs .css .scss .html .svg .png .jpg
RJS=node_modules/requirejs/bin/r.js
MOCHA_FORK=node_modules/mocha/bin/_mocha
COVER=node node_modules/istanbul/lib/cli.js
COVER2REPORT=genhtml --no-source --branch-coverage --no-sort --rc genhtml_med_limit=50 --rc genhtml_hi_limit=80 --quiet --output-directory
GIT=git
GIT_CURRENT_BRANCH=$(shell utl/get_current_git_branch.sh)
GIT_DEPLOY_FROM_BRANCH=main
CJS2AMD=utl/commonjs2amd.sh
PNG2FAVICO=utl/png2favico.sh
RESIZE=utl/resize.sh
IOSRESIZE=utl/iosresize.sh
SEDVERSION=utl/sedversion.sh
NPM=npm
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
SASS=node_modules/.bin/sass --style=compressed --no-source-map

.PHONY: help dev-build install  deploy-gh-pages check fullcheck  mostlyclean clean lint cover prerequisites report test

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

$(BUILDDIR)/%.json: src/%.json
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
	$(BUILDDIR)/manifest.json \
	$(BUILDDIR)/lib/require.js \
	$(BUILDDIR)/lib/screenfull.js \
	$(BUILDDIR)/service-worker.js \
	$(BUILDDIR)/script/wordywordy.js \
	$(BUILDDIR)/style/wordywordy.css \
	$(BUILDDIR)/style/themes/057.css \
	$(BUILDDIR)/style/themes/074.css \
	$(BUILDDIR)/style/themes/220.css \
	$(BUILDDIR)/style/themes/fountainpen.css \
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
	$(BUILDDIR)/font/Roboto-Italic.woff \
	$(BUILDDIR)/font/Roboto-Light.woff \
	$(BUILDDIR)/font/Roboto-LightItalic.woff \
	$(BUILDDIR)/font/Roboto-Regular.woff \
	$(BUILDDIR)/font/Roboto-Thin.woff \
	$(BUILDDIR)/font/Roboto-ThinItalic.woff \
	$(BUILDDIR)/font/Gochi_Hand_Regular.woff \
	$(BUILDDIR)/font/controls.eot \
	$(BUILDDIR)/font/controls.svg \
	$(BUILDDIR)/font/controls.ttf \
	$(BUILDDIR)/font/controls.woff \
	$(BUILDDIR)/font/057.woff \
	$(BUILDDIR)/font/074.woff \
	$(BUILDDIR)/images/background.jpg \
	$(BUILDDIR)/images/057pattern.png \
	$(BUILDDIR)/images/tail.png \
	$(BUILDDIR)/images/wordywordy.png \
	$(BUILDDIR)/images/wordywordy-social-sharing-pic.png \
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

$(BUILDDIR)/service-worker.js: src/service-worker.js
	$(SEDVERSION) < $< > $@

# "phony" targets

prerequisites:
	$(NPM) install

dev-build: src/index.html

lint:
	$(NPM) run lint

depcruise:
	$(NPM) run depcruise

lint-fix:
	$(NPM) run lint:fix

cover: dev-build
	$(NPM) run test:cover

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

# depend:
# 	$(MAKEDEPEND) --system amd --flat-define SCRIPT_SOURCES_WEB src/script/wordywordy.js
# 	$(MAKEDEPEND) --system amd --append src/script/wordywordy.js

doc:
	$(DOC) $(SCRIPT_SOURCES_WEB) src/script/README.md

test: dev-build
	$(NPM) run test

check: lint depcruise test

fullcheck: check

update-dependencies: run-update-dependencies clean-generated-sources test
	$(GIT) diff package.json

clean-generated-sources:
	rm -rf $(GENERATED_SOURCES)

somewhatclean: clean-generated-sources
	rm -rf $(BUILDDIR)/index.html
	rm -rf $(BUILDDIR)/service-worker.js
	rm -rf $(PRODDIRS)
	rm -rf testcoverage-report

clean: somewhatclean
	rm -rf $(FAVICONS)

# DO NOT DELETE THIS LINE -- js-makedepend depends on it.

# amd dependencies
SCRIPT_SOURCES_WEB=src/script/wordywordy.js \
	src/lib/screenfull.js \
	src/script/chopper/chopper.js \
	src/script/chopper/constants.js \
	src/script/chopper/gear.js \
	src/script/chopper/navigator.js \
	src/script/chopper/tokenizer.js \
	src/script/ui-control/actions.js \
	src/script/ui-control/constants.js \
	src/script/ui-control/eventmap.js \
	src/script/ui-control/themeswitcher.js \
	src/script/utl/browserutl.js \
	src/script/utl/formatting.js \
	src/script/utl/gaga.js \
	src/script/utl/paramslikker.js \
	src/script/utl/stopwatch.js
# amd dependencies
src/script/wordywordy.js: \
	src/script/ui-control/actions.js \
	src/script/ui-control/constants.js \
	src/script/ui-control/eventmap.js \
	src/script/utl/browserutl.js \
	src/script/utl/formatting.js \
	src/script/utl/gaga.js \
	src/script/utl/paramslikker.js

src/script/ui-control/actions.js: \
	src/lib/screenfull.js \
	src/script/chopper/chopper.js \
	src/script/ui-control/constants.js \
	src/script/ui-control/themeswitcher.js \
	src/script/utl/browserutl.js \
	src/script/utl/formatting.js \
	src/script/utl/gaga.js \
	src/script/utl/stopwatch.js

src/script/chopper/chopper.js: \
	src/script/chopper/constants.js \
	src/script/chopper/gear.js \
	src/script/chopper/navigator.js \
	src/script/chopper/tokenizer.js

src/script/chopper/gear.js: \
	src/script/chopper/constants.js \
	src/script/utl/formatting.js

src/script/chopper/navigator.js: \
	src/script/chopper/constants.js \
	src/script/utl/formatting.js

src/script/chopper/tokenizer.js: \
	src/script/chopper/constants.js

src/script/ui-control/themeswitcher.js: \
	src/script/utl/formatting.js

src/script/ui-control/eventmap.js: \
	src/script/ui-control/actions.js \
	src/script/utl/browserutl.js \
	src/script/utl/gaga.js
