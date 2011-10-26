NAME = Montastic
WIDGET = $(NAME).wdgt
TEST_WIDGET = $(NAME)_test.wdgt
DEV_FILES = Makefile TODO

default:	test

test:
	rm -rf ../$(TEST_WIDGET)
	mkdir ../$(TEST_WIDGET)
	cp -r * ../$(TEST_WIDGET)
	open ../$(TEST_WIDGET)

zip:
	rm -rf /tmp/$(WIDGET)
	cd .. && \
		cp -r $(WIDGET) /tmp && \
		cd /tmp/$(WIDGET) && \
		find . -depth -name .svn -exec rm -rf {} \; && \
		rm -f $(DEV_FILES) && \
		cd /tmp && \
		zip -r $(WIDGET).zip $(WIDGET) && \
		rm -r /tmp/$(WIDGET)

version:
	ruby -e 'IO.read("Info.plist") =~ /CFBundleVersion.*?string>(.*?)</m; print $$1' >/tmp/version.txt

publish:	zip version
	scp /tmp/$(WIDGET).zip /tmp/version.txt Icon.png \
		io.com:public-web/projects/montastic_dashboard
