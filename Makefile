start_db:
	docker run --name mysql -d \
		-p 3306:3306 \
		-e MYSQL_ROOT_PASSWORD=root \
		-v mysql:/var/lib/mysql \
		mysql:8

start_app:
	docker run --name django -d \
        -p 8000:8000 \
	

