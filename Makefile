#!/usr/bin/make
# little make file to 

#################################################################################
#		deploy								#
#################################################################################

deploy:	deployGhPage;

deployGhPage:
	rm -rf /tmp/acewidgetGhPages
	(cd /tmp && git clone git@github.com:jeromeetienne/acewidget.git acewidgetGhPages)
	(cd /tmp/acewidgetGhPages && git checkout gh-pages)
	cp -a ace/ js/ *.html *.js /tmp/acewidgetGhPages
	(cd /tmp/acewidgetGhPages && git add . && git commit -a -m "Another deployement" && git push origin gh-pages)
	#rm -rf /tmp/acewidgetGhPages
