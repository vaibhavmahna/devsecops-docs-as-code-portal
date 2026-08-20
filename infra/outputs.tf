output "webapp_url" {
  value = "https://${azurerm_linux_web_app.webapp.default_hostname}"
}

output "storage_share_name" {
  value = azurerm_storage_share.fileshare.name
}
