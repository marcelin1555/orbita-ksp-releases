const status = document.querySelector("#status");
let statusTimer;
async function loadRelease() {
  try {
    const response = await fetch("/release.json");
    if (!response.ok) throw Error("Metadados indisponíveis");
    const release = await response.json();
    if (!/^\d+\.\d+\.\d+$/.test(release.version))
      throw Error("Versão inválida");
    document.querySelectorAll("[data-version]").forEach((el) => {
      el.textContent = release.version;
    });
    const list = document.querySelector("#checksums");
    list.replaceChildren();
    for (const kind of ["setup", "portable", "update"]) {
      const file = release.files[kind];
      const url = new URL(file.url);
      if (
        url.protocol !== "https:" ||
        url.hostname !== "github.com" ||
        !url.pathname.startsWith(
          "/marcelin1555/orbita-ksp-releases/releases/download/",
        )
      )
        throw Error("Download inválido");
      if (!/^[a-f0-9]{64}$/i.test(file.sha256)) throw Error("Hash inválido");
      document.querySelectorAll(`[data-download="${kind}"]`).forEach((el) => {
        el.href = url.href;
      });
      document.querySelectorAll(`[data-size="${kind}"]`).forEach((el) => {
        el.textContent =
          (file.bytes / 1048576).toLocaleString("pt-BR", {
            maximumFractionDigits: 1,
          }) + " MiB";
      });
      const row = document.createElement("div"),
        name = document.createElement("dt"),
        value = document.createElement("dd"),
        code = document.createElement("code"),
        copy = document.createElement("button");
      name.textContent = file.name;
      code.textContent = file.sha256;
      copy.textContent = "Copiar SHA-256";
      copy.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(file.sha256);
          status.textContent = "SHA-256 copiado.";
        } catch {
          status.textContent = "Selecione e copie o hash exibido acima.";
        }
        clearTimeout(statusTimer);
        status.hidden = false;
        statusTimer = setTimeout(() => {
          status.hidden = true;
        }, 4500);
      });
      value.append(code, copy);
      row.append(name, value);
      list.append(row);
    }
  } catch {
    // Os links versionados do HTML continuam utilizáveis sem os metadados opcionais.
  }
}
loadRelease();
