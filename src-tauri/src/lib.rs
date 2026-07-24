// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(serde::Serialize)]
#[serde(rename_all = "camelCase")]
struct AppInfo {
    name: String,
    version: String,
}

#[tauri::command]
fn get_app_info() -> AppInfo {
    AppInfo {
        name: "Quick Note".to_string(),
        version: env!("CARGO_PKG_VERSION").to_string(),
    }
}

#[tauri::command]
fn normalize_tag(tag: String) -> Result<String, String> {
    let normalized = tag.trim().trim_start_matches('#').trim().to_lowercase();

    if normalized.is_empty() {
        Err("Tag cannot be empty".to_string())
    } else {
        Ok(normalized)
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, get_app_info, normalize_tag])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[cfg(test)]
mod tests {
    use super::normalize_tag;

    #[test]
    fn normalizes_tag() {
        let result = normalize_tag(" #Work ".to_string());

        assert_eq!(result, Ok("work".to_string()));
    }

    #[test]
    fn rejects_empty_tag() {
        let result = normalize_tag(" # ".to_string());

        assert_eq!(result, Err("Tag cannot be empty".to_string()));
    }
}
