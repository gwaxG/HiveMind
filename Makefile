start: build_cont
	uvicorn back.asgi:application --port 8000

reapare_server:
	sudo apt update
	sudo apt install nginx

	sudo apt install certbot python3-certbot-nginx
	sudo certbot --nginx -d hivemind.solar -d hivemind.solar
	// renew
	// sudo certbot renew --dry-run
	
	

	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
	source ~/.bashrc
	nvm install 18
	sudo apt-get install -y nodejs
	sudo apt install npm
	sudo npm install -g @angular/cli
	cd ~/HiveMind/front 
	npm install
	npm build --configuration production

	sudo apt-get install python3-pip 
	pip install virtualenv
	sudo apt install python3-venv
	python3 -m venv venv
	source venv/bin/activate
	pip install -r requirements.txt
	
