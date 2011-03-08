#!/usr/bin/make
# little make file to 

all:


build: index_html_build

index_html_build:
	pandoc -A pandoc.header.html -s README.md -o index.html

#################################################################################
#		deploy								#
#################################################################################

deploy:	build deployGhPage

deployGhPage:
	rm -rf /tmp/acewidgetGhPages
	(cd /tmp && git clone git@github.com:jeromeetienne/acewidget.git acewidgetGhPages)
	(cd /tmp/acewidgetGhPages && git checkout gh-pages)
	cp -a ace/ js/ *.html /tmp/acewidgetGhPages
	(cd /tmp/acewidgetGhPages && git add . && git commit -a -m "Another deployement" && git push origin gh-pages)
	#rm -rf /tmp/acewidgetGhPages
