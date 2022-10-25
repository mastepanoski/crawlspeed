.PHONY: build-local
build-local: ## Build the local docker image.
	docker compose -f docker/docker-compose.yml build

.PHONY: start-local
start-local: ## Start the local docker container.
	docker compose -f docker/docker-compose.yml up -d

.PHONY: stop-local
stop-local: ## Stop the local docker container.
	docker compose -f docker/docker-compose.yml down
	docker system prune

.PHONY: logs-local
logs-local: ## Show the logs of the local docker container.
	docker compose -f docker/docker-compose.yml logs


