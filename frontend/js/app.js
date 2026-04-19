const API_BASE_URL = "http://127.0.0.1:5000";

// --- Son Kullanıcı Sorgulama Formu ---
const verifyForm = document.getElementById('verify-form');
if (verifyForm) {
    verifyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const productId = document.getElementById('product-id').value.trim();
        if(!productId) return;

        const spinner = document.getElementById('verify-spinner');
        const resultContainer = document.getElementById('result-container');
        
        // Animasyon ve Yükleniyor Göstergesi
        spinner.classList.remove('hidden');
        resultContainer.classList.add('opacity-0', 'translate-y-4');
        setTimeout(() => resultContainer.classList.add('hidden'), 300);

        try {
            const response = await fetch(`${API_BASE_URL}/verify-product/${encodeURIComponent(productId)}`);
            const data = await response.json();
            
            resultContainer.innerHTML = '';
            
            if (response.ok && data.exists) {
                // Zaman damgasını insani formata çevir
                const dateObj = new Date(data.timestamp * 1000);
                const dateStr = dateObj.toLocaleDateString('tr-TR') + ' ' + dateObj.toLocaleTimeString('tr-TR');

                resultContainer.innerHTML = `
                    <div class="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-green-500/40">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-green-400">Orijinal Ürün Onaylandı</h3>
                                <p class="text-gray-400 text-sm">Blockchain kayıtları eşleşti.</p>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4 mt-6">
                            <div class="bg-black/40 rounded-xl p-4 border border-white/5 shadow-inner">
                                <p class="text-gray-500 text-xs mb-1 uppercase tracking-wider font-semibold">Üretici</p>
                                <p class="font-bold text-white text-lg">${data.manufacturer}</p>
                            </div>
                            <div class="bg-black/40 rounded-xl p-4 border border-white/5 shadow-inner">
                                <p class="text-gray-500 text-xs mb-1 uppercase tracking-wider font-semibold">Model</p>
                                <p class="font-bold text-white text-lg">${data.model}</p>
                            </div>
                            <div class="bg-black/40 rounded-xl p-4 border border-white/5 shadow-inner col-span-2">
                                <p class="text-gray-500 text-xs mb-1 uppercase tracking-wider font-semibold">Mevcut Sahibi Cüzdanı (Hash)</p>
                                <p class="font-mono text-sm text-blue-300 break-all">${data.currentOwner}</p>
                            </div>
                            <div class="bg-black/40 rounded-xl p-4 border border-white/5 shadow-inner col-span-2">
                                <p class="text-gray-500 text-xs mb-1 uppercase tracking-wider font-semibold">Üretim/İlk Kayıt Zamanı</p>
                                <p class="font-semibold text-gray-300">${dateStr}</p>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                resultContainer.innerHTML = `
                    <div class="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(239,68,68,0.15)]">
                        <div class="flex items-center gap-4">
                            <div class="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-red-500/40 shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-red-400">DİKKAT! Kayıt Bulunamadı</h3>
                                <p class="text-gray-300 mt-1 text-sm">${data.message || 'Ürün orijinalliği doğrulanamadı. Sahte veya sisteme kaydedilmemiş olabilir.'}</p>
                            </div>
                        </div>
                    </div>
                `;
            }
        } catch (error) {
            resultContainer.innerHTML = `
                <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 flex gap-4 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p class="text-yellow-400 font-semibold">Sunucu ile bağlantı kurulamadı. Lütfen API'nin çalıştığından emin olun.</p>
                </div>
            `;
        } finally {
            spinner.classList.add('hidden');
            resultContainer.classList.remove('hidden');
            // CSS Animasyonunun tetiklenmesi için küçük bir gecikme
            setTimeout(() => {
                resultContainer.classList.remove('opacity-0', 'translate-y-4');
            }, 50);
        }
    });
}

// --- Üretici Mint Formu ---
const addForm = document.getElementById('add-product-form');
if (addForm) {
    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const productId = document.getElementById('add-id').value.trim();
        const manufacturer = document.getElementById('add-manufacturer').value.trim();
        const model = document.getElementById('add-model').value.trim();
        
        const spinner = document.getElementById('add-spinner');
        const btnText = document.getElementById('add-btn-text');
        const msgDiv = document.getElementById('admin-message');
        
        spinner.classList.remove('hidden');
        btnText.textContent = "Blockchain İşleniyor...";
        msgDiv.classList.add('hidden', 'opacity-0');

        try {
            const response = await fetch(`${API_BASE_URL}/add-product`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product_id: productId,
                    manufacturer: manufacturer,
                    model: model
                })
            });
            
            const data = await response.json();
            
            msgDiv.classList.remove('hidden', 'bg-red-500/10', 'text-red-400', 'border-red-500/30', 'bg-green-500/10', 'text-green-400', 'border-green-500/30');
            
            if (response.ok) {
                // Başarılı
                msgDiv.classList.add('bg-green-500/10', 'text-green-400', 'border-green-500/30');
                msgDiv.innerHTML = `
                    <div class="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <strong>Ürün Başarıyla Kaydedildi!</strong>
                            <p class="text-xs text-green-500/80 mt-1 break-all select-all font-mono border-t border-green-500/20 pt-1">
                                TxHash: ${data.transaction_hash}
                            </p>
                        </div>
                    </div>`;
                addForm.reset();
            } else {
                // Hata durumu (Örn: ürün zaten var)
                msgDiv.classList.add('bg-red-500/10', 'text-red-400', 'border-red-500/30');
                msgDiv.innerHTML = `
                    <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <strong>Hata:</strong> ${data.error || 'İşlem reddedildi.'}
                    </div>`;
            }
        } catch (error) {
            msgDiv.classList.remove('hidden');
            msgDiv.classList.add('bg-red-500/10', 'text-red-400', 'border-red-500/30');
            msgDiv.innerHTML = `<strong>Bağlantı Hatası!</strong> API sunucusuna ulaşılamadı.`;
        } finally {
            spinner.classList.add('hidden');
            btnText.textContent = "Blockchain'e Yaz";
            msgDiv.classList.remove('hidden');
            setTimeout(() => msgDiv.classList.remove('opacity-0'), 50);
        }
    });
}
