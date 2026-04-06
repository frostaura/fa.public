ensure-env:
	@if [ ! -f .env ]; then cp .env.example .env; fi

up: ensure-env
	docker compose up -d

build-images: ensure-env
	docker compose build

down:
	docker compose down --remove-orphans

test:
	npm run test

ci-local: ensure-env
	npm run lint
	npm run build
	npm run test
	docker compose build
