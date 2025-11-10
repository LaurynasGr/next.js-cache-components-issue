.PHONY:
help:
	@echo Tasks:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)


# DEVELOPMENT SETUP
dev: ## Run development server
	npm run dev

build: ## Build application
	npm run build

serve: build ## Build production version of application and start the server
	NODE_ENV=production npm run start

clean-files: ## Remove all generated files
	rm -rf node_modules .next && \
		npm install
