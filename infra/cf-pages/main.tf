provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "cloudflare_pages_project" "gachify_pages_project" {
  account_id        =  var.cloudflare_account_id
  name              = "gachify-ui"
  production_branch = "master"

  source {
    type= "github"
    config {
      owner                         = "mrcatlait"
      repo_name                     = "gachify"
      production_branch             = "master"
      pr_comments_enabled           = true
      deployments_enabled           = true
      production_deployment_enabled = true
      preview_deployment_setting    = "all"
      preview_branch_includes       = ["*"]
      preview_branch_excludes       = ["master"]
    }
  }

  build_config {
    build_command       = "npm run build"
    destination_dir     = "dist/browser"
    root_dir            = "apps/ui"
  }
}

resource "cloudflare_pages_domain" "gachify_domain" {
  account_id    = var.cloudflare_account_id
  project_name  = cloudflare_pages_project.gachify_pages_project.name
  domain        = "gachify.club"
}

resource "cloudflare_record" "gachify_record" {
  zone_id         = var.cloudflare_zone_id
  name            = cloudflare_pages_domain.gachify_domain.domain
  value           = cloudflare_pages_project.gachify_pages_project.subdomain
  type            = "CNAME"
  proxied         = true
  ttl             = 1
  allow_overwrite = true
}
