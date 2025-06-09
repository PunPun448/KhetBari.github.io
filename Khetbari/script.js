// KhetBari - Comprehensive Feature Implementation
class KhetBariApp {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('khetbari_cart')) || [];
    this.wishlist = JSON.parse(localStorage.getItem('khetbari_wishlist')) || [];
    this.user = JSON.parse(localStorage.getItem('khetbari_user')) || null;
    this.subscriptions = JSON.parse(localStorage.getItem('khetbari_subscriptions')) || [];
    this.orders = JSON.parse(localStorage.getItem('khetbari_orders')) || [];
    this.farmers = JSON.parse(localStorage.getItem('khetbari_farmers')) || this.getDefaultFarmers();
    this.products = JSON.parse(localStorage.getItem('khetbari_products')) || this.getDefaultProducts();
    this.reviews = JSON.parse(localStorage.getItem('khetbari_reviews')) || {};
    this.loyaltyPoints = parseInt(localStorage.getItem('khetbari_loyalty_points')) || 0;
    this.deliveryRoutes = [];
    this.currentLocation = null;
    this.map = null;
    this.googleMap = null;
    this.currentInfoWindow = null;
    this.farmMarkers = [];

    this.initializeApp();
  }

  initializeApp() {
    this.createParticles();
    this.bindEvents();
    this.updateCartUI();
    this.loadProducts();
    this.initializeNotifications();
    this.trackCarbonFootprint();
    this.initializeVoiceSearch();
    this.loadUserFromStorage();
    this.loadSettings();
    this.updateUserUI();
    this.initializeBackToTop();
    this.initializeDropdownClickOutside();
    this.initializeImageOptimization();
    this.enforceHTTPS();
  }

  loadUserFromStorage() {
    const savedUser = localStorage.getItem('khetbari_user');
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }
  }

  loadSettings() {
    const savedSettings = localStorage.getItem('khetbari_settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      if (settings.darkMode) {
        document.body.classList.add('dark-mode');
      }
    }
  }

  updateUserUI() {
    const userProfileContainer = document.getElementById('userProfileContainer');
    const authBtn = document.getElementById('authBtn');

    if (this.user) {
      if (userProfileContainer) userProfileContainer.style.display = 'block';
      if (authBtn) authBtn.style.display = 'none';

      const profileName = document.getElementById('profileName');
      const profileNameLarge = document.getElementById('profileNameLarge');
      const profileType = document.getElementById('profileType');
      const profilePoints = document.getElementById('profilePoints');

      if (profileName) profileName.textContent = this.user.name.split(' ')[0];
      if (profileNameLarge) profileNameLarge.textContent = this.user.name;
      if (profileType) profileType.textContent = this.user.type === 'seller' ? 'Farmer/Seller' : 'Buyer';
      if (profilePoints) profilePoints.textContent = this.loyaltyPoints;

      const profileFullName = document.getElementById('profileFullName');
      const profileEmail = document.getElementById('profileEmail');
      const editName = document.getElementById('editName');
      const editEmail = document.getElementById('editEmail');
      const editPhone = document.getElementById('editPhone');
      const editAddress = document.getElementById('editAddress');

      if (profileFullName) profileFullName.textContent = this.user.name;
      if (profileEmail) profileEmail.textContent = this.user.email;
      if (editName) editName.value = this.user.name;
      if (editEmail) editEmail.value = this.user.email;
      if (editPhone) editPhone.value = this.user.phone || '';
      if (editAddress) editAddress.value = this.user.address || '';
    } else {
      if (userProfileContainer) userProfileContainer.style.display = 'none';
      if (authBtn) authBtn.style.display = 'block';
    }
  }

  getDefaultFarmers() {
    return [
      {
        id: 1,
        name: "Green Valley Farm",
        owner: "Sarah Johnson",
        location: "Vermont, USA",
        coordinates: { lat: 44.2619, lng: -72.5806 },
        address: "1234 Farm Road, Montpelier, VT 05602",
        certifications: ["Organic", "Non-GMO", "Fair Trade"],
        rating: 4.8,
        story: "Family-owned farm for 3 generations, committed to sustainable farming practices.",
        products: ["tomatoes", "lettuce", "carrots"],
        avatar: "👩‍🌾",
        farmSize: "50 acres",
        experience: "25 years",
        specialties: ["Heirloom vegetables", "Seasonal produce"],
        visits: 0,
        totalSales: 1500,
        visitingHours: "9:00 AM - 5:00 PM",
        phone: "(802) 555-0123",
        email: "sarah@greenvalleyfarm.com"
      },
      {
        id: 2,
        name: "Sunrise Organics",
        owner: "Mike Chen",
        location: "California, USA",
        coordinates: { lat: 37.7749, lng: -122.4194 },
        address: "5678 Organic Lane, San Francisco, CA 94102",
        certifications: ["Organic", "Regenerative"],
        rating: 4.6,
        story: "Pioneering regenerative agriculture to heal the soil and community.",
        products: ["apples", "berries", "herbs"],
        avatar: "👨‍🌾",
        farmSize: "75 acres",
        experience: "15 years",
        specialties: ["Berries", "Medicinal herbs"],
        visits: 0,
        totalSales: 2100,
        visitingHours: "8:00 AM - 6:00 PM",
        phone: "(415) 555-0456",
        email: "mike@sunriseorganics.com"
      },
      {
        id: 3,
        name: "Prairie Wind Farm",
        owner: "Emma Rodriguez",
        location: "Texas, USA",
        coordinates: { lat: 30.2672, lng: -97.7431 },
        address: "9876 Prairie Road, Austin, TX 78701",
        certifications: ["Organic", "Biodynamic"],
        rating: 4.7,
        story: "Sustainable farming in the heart of Texas, focusing on soil health and biodiversity.",
        products: ["corn", "peppers", "herbs"],
        avatar: "👩‍🌾",
        farmSize: "120 acres",
        experience: "18 years",
        specialties: ["Heritage corn varieties", "Hot peppers"],
        visits: 0,
        totalSales: 1800,
        visitingHours: "7:00 AM - 7:00 PM",
        phone: "(512) 555-0789",
        email: "emma@prairiewindfarm.com"
      },
      {
        id: 4,
        name: "Mountain Fresh Co-op",
        owner: "David Kim",
        location: "Colorado, USA",
        coordinates: { lat: 39.7392, lng: -104.9903 },
        address: "2468 Mountain View Drive, Denver, CO 80202",
        certifications: ["Organic", "Fair Trade"],
        rating: 4.9,
        story: "High-altitude farming collective producing premium mountain-grown produce.",
        products: ["potatoes", "greens", "berries"],
        avatar: "👨‍🌾",
        farmSize: "200 acres",
        experience: "22 years",
        specialties: ["Alpine vegetables", "Cold-hardy crops"],
        visits: 0,
        totalSales: 2500,
        visitingHours: "10:00 AM - 4:00 PM",
        phone: "(303) 555-0135",
        email: "david@mountainfreshcoop.com"
      }
    ];
  }

  getDefaultProducts() {
    return [
      {
        id: 1,
        name: "Organic Tomatoes",
        description: "Fresh, juicy organic tomatoes grown with love and care",
        price: 180,
        unit: "kg",
        category: "vegetables",
        farmer: "Green Valley Farm",
        farmerId: 1,
        inSeason: true,
        stock: 50,
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop",
        certifications: ["Organic", "Non-GMO"],
        nutritionScore: 85,
        carbonFootprint: 0.5,
        harvestDate: "2024-01-15",
        shelfLife: "7 days",
        recipes: ["Caprese Salad", "Tomato Soup", "Fresh Salsa"]
      },
      {
        id: 2,
        name: "Fresh Lettuce",
        description: "Crisp and fresh organic lettuce, perfect for salads",
        price: 120,
        unit: "piece",
        category: "vegetables",
        farmer: "Green Valley Farm",
        farmerId: 1,
        inSeason: true,
        stock: 30,
        image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop",
        certifications: ["Organic"],
        nutritionScore: 75,
        carbonFootprint: 0.3,
        harvestDate: "2024-01-16",
        shelfLife: "5 days",
        recipes: ["Caesar Salad", "Garden Salad", "Lettuce Wraps"]
      },
      {
        id: 3,
        name: "Organic Carrots",
        description: "Sweet and crunchy organic carrots, rich in beta-carotene",
        price: 100,
        unit: "kg",
        category: "vegetables",
        farmer: "Green Valley Farm",
        farmerId: 1,
        inSeason: true,
        stock: 40,
        image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&h=300&fit=crop",
        certifications: ["Organic", "Non-GMO"],
        nutritionScore: 90,
        carbonFootprint: 0.4,
        harvestDate: "2024-01-14",
        shelfLife: "14 days",
        recipes: ["Carrot Cake", "Roasted Carrots", "Carrot Soup"]
      },
      {
        id: 4,
        name: "Fresh Apples",
        description: "Crisp and sweet organic apples from our orchard",
        price: 220,
        unit: "kg",
        category: "fruits",
        farmer: "Sunrise Organics",
        farmerId: 2,
        inSeason: true,
        stock: 60,
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop",
        certifications: ["Organic"],
        nutritionScore: 80,
        carbonFootprint: 0.6,
        harvestDate: "2024-01-12",
        shelfLife: "21 days",
        recipes: ["Apple Pie", "Apple Sauce", "Apple Crisp"]
      }
    ];
  }

  // Core Navigation
  showPage(pageId) {
    // Check if trying to access sell page without farmer account
    if (pageId === 'sell') {
      if (!this.user || this.user.type !== 'seller') {
        this.showToast('Only registered farmers can sell products. Please register as a farmer.', 'error');
        this.showPage('auth');
        return;
      }
    }

    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });

    const targetPage = document.getElementById(pageId);
    const navItem = document.querySelector(`[data-page="${pageId}"]`);

    if (targetPage) {
      targetPage.classList.add('active');
    }
    if (navItem) {
      navItem.classList.add('active');
    }

    // Load page-specific content
    if (pageId === 'products') {
      this.loadProducts();
    } else if (pageId === 'farmers') {
      this.loadFarmers();
    } else if (pageId === 'profile') {
      this.loadUserProfile();
    } else if (pageId === 'map') {
      this.initializeMap();
    } else if (pageId === 'wishlist') {
      this.loadWishlist();
    } else if (pageId === 'orders') {
      this.loadOrders();
    } else if (pageId === 'settings') {
      this.loadSettingsPage();
    }
  }

  loadWishlist() {
    const grid = document.getElementById('wishlistGrid');
    if (!grid) return;

    if (this.wishlist.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: rgba(255,255,255,0.6);">
          <div style="font-size: 4rem; margin-bottom: 1rem;">💔</div>
          <h3>Your wishlist is empty</h3>
          <p>Add some products to your wishlist to see them here!</p>
          <button class="cta-button" onclick="showPage('products')" style="margin-top: 1rem;">
            Browse Products
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = this.wishlist.map(product => this.createProductCard(product)).join('');
  }

  loadOrders() {
    const ordersList = document.getElementById('ordersList');
    if (!ordersList) return;

    if (this.orders.length === 0) {
      ordersList.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: rgba(255,255,255,0.6);">
          <div style="font-size: 4rem; margin-bottom: 1rem;">📦</div>
          <h3>No orders yet</h3>
          <p>Your order history will appear here once you make your first purchase!</p>
          <button class="cta-button" onclick="showPage('products')" style="margin-top: 1rem;">
            Start Shopping
          </button>
        </div>
      `;
      return;
    }

    ordersList.innerHTML = this.orders.map(order => `
      <div class="order-card" style="background: var(--glass); border: 1px solid var(--glass-border); border-radius: 15px; padding: 1.5rem; margin-bottom: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
          <div>
            <h4>Order #${order.id.toString().slice(-6)}</h4>
            <p style="opacity: 0.8; font-size: 0.9rem;">${new Date(order.date).toLocaleDateString()}</p>
          </div>
          <span class="status-badge" style="padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; 
            ${order.status === 'delivered' ? 'background: rgba(34, 197, 94, 0.2); color: #22c55e;' :
        order.status === 'shipped' ? 'background: rgba(59, 130, 246, 0.2); color: #3b82f6;' :
          'background: rgba(245, 158, 11, 0.2); color: #f59e0b;'}">
            ${order.status.toUpperCase()}
          </span>
        </div>
        <div style="margin-bottom: 1rem;">
          ${order.items.map(item => `
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
              <div style="width: 30px; height: 30px; border-radius: 5px; overflow: hidden; flex-shrink: 0;">
                ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">` : '<div style="width: 100%; height: 100%; background: var(--primary); display: flex; align-items: center; justify-content: center; color: white; font-size: 0.7rem;">IMG</div>'}
              </div>
              <span>${item.name}</span>
              <span style="margin-left: auto; opacity: 0.8;">x${item.quantity}</span>
            </div>
          `).join('')}
        </div>
        <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem; display: flex; justify-content: space-between;">
          <span style="font-weight: 600;">Total: रू ${order.total.toFixed(2)}</span>
          <div style="display: flex; gap: 0.5rem;">
            <button class="small-btn" onclick="trackOrder(${order.id})" style="background: var(--primary); border: none; color: white; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">
              Track Order
            </button>
            <button class="small-btn" onclick="reorderItems(${order.id})" style="background: var(--glass); border: 1px solid var(--glass-border); color: white; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">
              Reorder
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Map Management
  initializeMap() {
    const mapContainer = document.getElementById('farmMap');
    if (!mapContainer) return;

    // If Leaflet is not loaded yet, show loading message
    if (typeof L === 'undefined') {
      mapContainer.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column; color: rgba(255,255,255,0.8);">
          <div class="spinner"></div>
          <p style="margin-top: 1rem;">Loading OpenStreetMap...</p>
          <small>Using free mapping service - no API key required!</small>
        </div>
      `;
      return;
    }

    this.initLeafletMap();
  }

  initLeafletMap() {
    const mapContainer = document.getElementById('farmMap');
    if (!mapContainer) return;

    // Clear container
    mapContainer.innerHTML = '';

    // Center map on average farm location
    const avgLat = this.farmers.reduce((sum, farm) => sum + farm.coordinates.lat, 0) / this.farmers.length;
    const avgLng = this.farmers.reduce((sum, farm) => sum + farm.coordinates.lng, 0) / this.farmers.length;

    // Initialize Leaflet Map with OpenStreetMap
    this.map = L.map('farmMap').setView([avgLat, avgLng], 6);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(this.map);

    // Add custom styling to make it look more organic
    mapContainer.style.filter = 'hue-rotate(20deg) saturate(1.2) brightness(0.8)';
    mapContainer.style.borderRadius = '20px';
    mapContainer.style.overflow = 'hidden';

    // Add farm markers to map
    this.addLeafletMarkers();

    // Add user location if available
    this.addUserLocationToLeafletMap();

    // Add map controls
    this.addLeafletControls();
  }

  addLeafletMarkers() {
    if (!this.map) return;

    this.farmMarkers = [];

    this.farmers.forEach(farmer => {
      // Create custom marker with farm emoji
      const farmIcon = L.divIcon({
        html: `
          <div style="
            width: 40px; 
            height: 40px; 
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
            border-radius: 50% 50% 50% 0;
            border: 3px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
            transform: rotate(-45deg);
          ">
            <span style="transform: rotate(45deg);">${farmer.avatar}</span>
          </div>
        `,
        className: 'custom-farm-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 40]
      });

      const marker = L.marker([farmer.coordinates.lat, farmer.coordinates.lng], {
        icon: farmIcon,
        title: farmer.name
      }).addTo(this.map);

      // Create popup content
      const popupContent = this.createLeafletPopupContent(farmer);

      marker.bindPopup(popupContent, {
        maxWidth: 350,
        className: 'farm-popup-leaflet'
      });

      // Add click animation
      marker.on('click', () => {
        marker.getElement().style.animation = 'bounce 0.6s ease';
        setTimeout(() => {
          if (marker.getElement()) {
            marker.getElement().style.animation = '';
          }
        }, 600);
      });

      this.farmMarkers.push(marker);
    });
  }

  createLeafletPopupContent(farmer) {
    return `
      <div style="font-family: 'Inter', sans-serif; color: #333;">
        <div style="display: flex; align-items: center; margin-bottom: 12px;">
          <div style="font-size: 2rem; margin-right: 10px;">${farmer.avatar}</div>
          <div>
            <h3 style="margin: 0; color: #22c55e; font-size: 1.2rem;">${farmer.name}</h3>
            <p style="margin: 0; color: #666; font-size: 0.9rem;">by ${farmer.owner}</p>
          </div>
        </div>

        <div style="margin-bottom: 12px;">
          <p style="margin: 3px 0; font-size: 0.85rem;"><strong>📍 Address:</strong> ${farmer.address}</p>
          <p style="margin: 3px 0; font-size: 0.85rem;"><strong>🕐 Hours:</strong> ${farmer.visitingHours}</p>
          <p style="margin: 3px 0; font-size: 0.85rem;"><strong>📞 Phone:</strong> ${farmer.phone}</p>
        </div>

        <div style="margin-bottom: 12px;">
          <p style="margin: 3px 0; font-size: 0.85rem;"><strong>🏆 Rating:</strong> ${'⭐'.repeat(Math.floor(farmer.rating))} ${farmer.rating}</p>
          <p style="margin: 3px 0; font-size: 0.85rem;"><strong>🚜 Farm Size:</strong> ${farmer.farmSize}</p>
        </div>

        <div style="margin-bottom: 12px;">
          <p style="margin: 3px 0; font-size: 0.85rem;"><strong>🌱 Certifications:</strong></p>
          <div style="margin-top: 5px;">
            ${farmer.certifications.map(cert => `<span style="background: rgba(34, 197, 94, 0.1); color: #22c55e; padding: 2px 6px; border-radius: 8px; font-size: 11px; margin-right: 3px; display: inline-block;">${cert}</span>`).join('')}
          </div>
        </div>

        <p style="margin: 10px 0; font-style: italic; font-size: 0.8rem; color: #555;">"${farmer.story}"</p>

        <div style="display: flex; gap: 8px; margin-top: 15px;">
          <button onclick="showFarmerProfile(${farmer.id})" 
                  style="flex: 1; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border: none; color: white; padding: 8px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">
            View Profile
          </button>
          <button onclick="bookFarmVisit(${farmer.id})" 
                  style="flex: 1; background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%); border: none; color: white; padding: 8px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">
            Book Visit
          </button>
        </div>

        <div style="margin-top: 8px;">
          <button onclick="getDirectionsOSM(${farmer.coordinates.lat}, ${farmer.coordinates.lng})" 
                  style="width: 100%; background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); border: none; color: white; padding: 8px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">
            🗺️ Get Directions
          </button>
        </div>
      </div>
    `;
  }

  addUserLocationToLeafletMap() {
    if (!this.map || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = [position.coords.latitude, position.coords.longitude];

        // Create user location icon
        const userIcon = L.divIcon({
          html: `
            <div style="
              width: 20px; 
              height: 20px; 
              background: #0ea5e9;
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 8px rgba(14, 165, 233, 0.5);
            "></div>
          `,
          className: 'user-location-marker',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        // Add user marker
        const userMarker = L.marker(userLocation, {
          icon: userIcon,
          title: 'Your Location'
        }).addTo(this.map);

        userMarker.bindPopup('📍 Your Location').openPopup();

        this.currentLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
        this.calculateDistancesToFarmsOSM();
      },
      (error) => {
        console.log('Geolocation not available or denied');
      }
    );
  }

  addLeafletControls() {
    if (!this.map) return;

    // Add a custom control for farm information
    const farmControl = L.control({ position: 'topright' });

    farmControl.onAdd = function(map) {
      const div = L.DomUtil.create('div', 'farm-control');
      div.innerHTML = `
        <div style="
          background: rgba(0, 0, 0, 0.8); 
          color: white; 
          padding: 10px; 
          border-radius: 10px; 
          font-size: 12px;
          backdrop-filter: blur(10px);
        ">
          <div style="font-weight: bold; margin-bottom: 5px;">🌱 ${this.farmers.length} Local Farms</div>
          <div>Click markers to learn more!</div>
        </div>
      `;
      return div;
    }.bind(this);

    farmControl.addTo(this.map);
  }

  calculateDistancesToFarmsOSM() {
    if (!this.currentLocation) return;

    // Calculate straight-line distances (since we don't have routing API)
    this.farmers.forEach(farm => {
      const distance = this.calculateHaversineDistance(
        this.currentLocation.lat,
        this.currentLocation.lng,
        farm.coordinates.lat,
        farm.coordinates.lng
      );
      farm.distanceFromUser = `${distance.toFixed(1)} mi`;
      farm.durationFromUser = `~${Math.round(distance * 1.5)} min`; // Rough estimate
    });

    this.updateFarmStats();
  }

  calculateHaversineDistance(lat1, lon1, lat2, lon2) {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  updateFarmStats() {
    const avgDistanceElement = document.getElementById('avgDistance');
    if (avgDistanceElement && this.currentLocation) {
      const distances = this.farmers
        .filter(farm => farm.distanceFromUser)
        .map(farm => parseFloat(farm.distanceFromUser.replace(' mi', '')));

      if (distances.length > 0) {
        const avgDistance = distances.reduce((a, b) => a + b, 0) / distances.length;
        avgDistanceElement.textContent = avgDistance.toFixed(1);
      }
    }
  }

  addFarmMarkers(mapContainer) {
    const mapWidth = mapContainer.offsetWidth;
    const mapHeight = mapContainer.offsetHeight;

    this.farmers.forEach((farmer, index) => {
      // Convert coordinates to map position (simplified projection)
      const x = ((farmer.coordinates.lng + 180) / 360) * mapWidth;
      const y = ((90 - farmer.coordinates.lat) / 180) * mapHeight;

      // Create marker
      const marker = document.createElement('div');
      marker.className = 'farm-marker';
      marker.style.position = 'absolute';
      marker.style.left = x + 'px';
      marker.style.top = y + 'px';
      marker.style.transform = 'translate(-50%, -50%)';
      marker.style.width = '40px';
      marker.style.height = '40px';
      marker.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
      marker.style.borderRadius = '50% 50% 50% 0';
      marker.style.border = '3px solid white';
      marker.style.cursor = 'pointer';
      marker.style.boxShadow = '0 4px 15px rgba(34, 197, 94, 0.4)';
      marker.style.transition = 'all 0.3s ease';
      marker.style.display = 'flex';
      marker.style.alignItems = 'center';
      marker.style.justifyContent = 'center';
      marker.style.fontSize = '16px';
      marker.style.zIndex = '10';

      marker.innerHTML = farmer.avatar;

      // Add hover effects
      marker.addEventListener('mouseenter', () => {
        marker.style.transform = 'translate(-50%, -50%) scale(1.2)';
        marker.style.zIndex = '20';
      });

      marker.addEventListener('mouseleave', () => {
        marker.style.transform = 'translate(-50%, -50%) scale(1)';
        marker.style.zIndex = '10';
      });

      // Add click handler
      marker.addEventListener('click', () => {
        this.showFarmDetails(farmer, marker);
      });

      mapContainer.appendChild(marker);

      // Add farm name label
      const label = document.createElement('div');
      label.style.position = 'absolute';
      label.style.left = x + 'px';
      label.style.top = (y + 25) + 'px';
      label.style.transform = 'translateX(-50%)';
      label.style.background = 'rgba(0, 0, 0, 0.8)';
      label.style.color = 'white';
      label.style.padding = '4px 8px';
      label.style.borderRadius = '12px';
      label.style.fontSize = '12px';
      label.style.fontWeight = '600';
      label.style.whiteSpace = 'nowrap';
      label.style.pointerEvents = 'none';
      label.textContent = farmer.name;

      mapContainer.appendChild(label);
    });
  }

  addMapControls(mapContainer){
    const controls = document.createElement('div');
    controls.style.position = 'absolute';
    controls.style.top = '20px';
    controls.style.right = '20px';
    controls.style.display = 'flex';
    controls.style.flexDirection = 'column';
    controls.style.gap = '10px';
    controls.style.zIndex = '100';

    // Zoom in button
    const zoomIn = document.createElement('button');
    zoomIn.textContent = '+';
    zoomIn.style.cssText = `
      width: 40px; height: 40px; border: none; border-radius: 8px;
      background: rgba(255, 255, 255, 0.9); color: #333;
      font-size: 20px; font-weight: bold; cursor: pointer;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;
    `;

    // Zoom out button
    const zoomOut = document.createElement('button');
    zoomOut.textContent = '-';
    zoomOut.style.cssText = zoomIn.style.cssText;

    // Reset view button
    const resetView = document.createElement('button');
    resetView.textContent = '⌂';
    resetView.style.cssText = zoomIn.style.cssText;

    controls.appendChild(zoomIn);
    controls.appendChild(zoomOut);
    controls.appendChild(resetView);

    mapContainer.appendChild(controls);
  }

  showFarmDetails(farmer, marker) {
    // Remove existing popup
    const existingPopup = document.querySelector('.farm-popup');
    if (existingPopup) {
      existingPopup.remove();
    }

    const popup = document.createElement('div');
    popup.className = 'farm-popup';
    popup.style.cssText = `
      position: absolute;
      left: ${marker.style.left};
      top: ${marker.style.top};
      transform: translate(-50%, -120%);
      background: rgba(0, 0, 0, 0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(34, 197, 94, 0.3);
      border-radius: 15px;
      padding: 20px;
      color: white;
      min-width: 300px;
      z-index: 1000;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    `;

    popup.innerHTML = `
      <div style="display: flex; align-items: center; margin-bottom: 15px;">
        <div style="font-size: 2rem; margin-right: 10px;">${farmer.avatar}</div>
        <div>
          <h3 style="margin: 0; color: #22c55e;">${farmer.name}</h3>
          <p style="margin: 0; opacity: 0.8;">by ${farmer.owner}</p>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" 
                style="margin-left: auto; background: none; border: none; color: white; font-size: 20px; cursor: pointer;">×</button>
      </div>
      <div style="margin-bottom: 15px;">
        <p style="margin: 5px 0;"><strong>📍 Address:</strong> ${farmer.address}</p>
        <p style="margin: 5px 0;"><strong>🕐 Hours:</strong> ${farmer.visitingHours}</p>
        <p style="margin: 5px 0;"><strong>📞 Phone:</strong> ${farmer.phone}</p>
        <p style="margin: 5px 0;"><strong>📧 Email:</strong> ${farmer.email}</p>
      </div>
      <div style="margin-bottom: 15px;">
        <p style="margin: 5px 0;"><strong>🏆 Rating:</strong> ${'⭐'.repeat(Math.floor(farmer.rating))} ${farmer.rating}</p>
        <p style="margin: 5px 0;"><strong>🚜 Farm Size:</strong> ${farmer.farmSize}</p>
        <p style="margin: 5px 0;"><strong>👨‍🌾 Experience:</strong> ${farmer.experience}</p>
      </div>
      <div style="margin-bottom: 15px;">
        <strong>🌱 Certifications:</strong>
        <div style="margin-top: 5px;">
          ${farmer.certifications.map(cert => `<span style="background: rgba(34, 197, 94, 0.2); color: #22c55e; padding: 2px 8px; border-radius: 10px; font-size: 12px; margin-right: 5px; display: inline-block;">${cert}</span>`).join('')}
        </div>
      </div>
      <p style="margin: 10px 0; font-style: italic; opacity: 0.9;">"${farmer.story}"</p>
      <div style="display: flex; gap: 10px; margin-top: 15px;">
        <button onclick="showFarmerProfile(${farmer.id})" 
                style="flex: 1; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border: none; color: white; padding: 10px; border-radius: 8px; cursor: pointer; font-weight: 600;">
          View Profile
        </button>
        <button onclick="bookFarmVisit(${farmer.id})" 
                style="flex: 1; background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%); border: none; color: white; padding: 10px; border-radius: 8px; cursor: pointer; font-weight: 600;">
          Book Visit
        </button>
      </div>
    `;

    marker.parentElement.appendChild(popup);

    // Close popup when clicking outside
    setTimeout(() => {
      const closeHandler = (e) => {
        if (!popup.contains(e.target) && !marker.contains(e.target)) {
          popup.remove();
          document.removeEventListener('click', closeHandler);
        }
      };
      document.addEventListener('click', closeHandler);
    }, 100);
  }

  // Product Management
  loadProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const searchTerm = document.getElementById('searchBox')?.value.toLowerCase() || '';
    const sortBy = document.getElementById('sortSelect')?.value || 'default';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const priceRange = document.getElementById('priceRange')?.value || 50;
    const inSeasonOnly = document.getElementById('inSeasonOnly')?.checked || false;
    const nearbyOnly = document.getElementById('nearbyOnly')?.checked || false;

    // Get selected certifications
    const selectedCertifications = Array.from(document.querySelectorAll('.filter-checkboxes input[type="checkbox"]:checked'))
      .map(cb => cb.value);

    let filteredProducts = this.products.filter(product => {
      // Text search
      const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.farmer.toLowerCase().includes(searchTerm);

      // Category filter
      const matchesCategory = !categoryFilter || product.category === categoryFilter;

      // Price filter
      const matchesPrice = product.price <= priceRange;

      // Season filter
      const matchesSeason = !inSeasonOnly || product.inSeason;

      // Certification filter
      const matchesCertifications = selectedCertifications.length === 0 ||
        selectedCertifications.some(cert => product.certifications.includes(cert));

      // Nearby filter (simplified - would need actual distance calculation)
      const matchesDistance = !nearbyOnly || true; // Placeholder

      return matchesSearch && matchesCategory && matchesPrice && matchesSeason && matchesCertifications && matchesDistance;
    });

    // Sort products
    if (sortBy === 'price-asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'rating') {
      filteredProducts.sort((a, b) => this.getProductRating(b.id) - this.getProductRating(a.id));
    } else if (sortBy === 'newest') {
      filteredProducts.sort((a, b) => b.id - a.id);
    }

    grid.innerHTML = filteredProducts.map(product => this.createProductCard(product)).join('');

    // Update results count
    this.updateResultsCount(filteredProducts.length);
  }

  updateResultsCount(count) {
    const existingCount = document.querySelector('.results-count');
    if (existingCount) {
      existingCount.remove();
    }

    const header = document.querySelector('.section-header');
    if (header) {
      const countElement = document.createElement('div');
      countElement.className = 'results-count';
      countElement.textContent = `${count} products found`;
      countElement.style.cssText = 'color: rgba(255,255,255,0.8); font-size: 0.9rem; margin-top: 0.5rem;';
      header.appendChild(countElement);
    }
  }

  createProductCard(product) {
    const isInWishlist = this.wishlist.some(item => item.id === product.id);
    const rating = this.getProductRating(product.id);
    const reviewCount = this.getProductReviewCount(product.id);

    return `
      <div class="product-card" onclick="showProductDetails(${product.id})">
        <div class="product-image">
          ${product.image ? `<img src="${product.image}" alt="Fresh organic ${product.name} from ${product.farmer} - ${product.description}" class="product-img" loading="lazy" onload="this.classList.add('loaded')">` : '<div class="placeholder-image">No Image Available</div>'}
          <div class="product-badges">
            ${product.inSeason ? '<span class="badge season-badge">In Season</span>' : ''}
            ${product.certifications.map(cert => `<span class="badge cert-badge">${cert}</span>`).join('')}
          </div>
          <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist(${product.id})">
            ${isInWishlist ? '❤️' : '🤍'}
          </button>
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="product-farmer">👨‍🌾 ${product.farmer}</p>
          <p class="product-description">${product.description}</p>
          <div class="product-stats">
            <div class="rating">
              <span class="stars">${'⭐'.repeat(Math.floor(rating))}</span>
              <span class="rating-text">${rating.toFixed(1)} (${reviewCount})</span>
            </div>
            <div class="nutrition-score">
              <span class="score-label">Nutrition:</span>
              <span class="score-value">${product.nutritionScore}/100</span>
            </div>
          </div>
          <div class="product-meta">
            <span class="carbon-footprint">🌱 ${product.carbonFootprint}kg CO₂</span>
            <span class="stock-level">${product.stock} in stock</span>
          </div>
        </div>
        <div class="product-footer">
          <div class="product-price">रू ${product.price}/${product.unit}</div>
          <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  }

  showProductDetail(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    const farmer = this.farmers.find(f => f.id === product.farmerId);
    const rating = this.getProductRating(productId);
    const reviews = this.reviews[productId] || [];
    const recommendations = this.getProductRecommendations(product);

    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    
    const detailPage = document.createElement('div');
    detailPage.className = 'page active';
    detailPage.id = 'product-detail';
    
    detailPage.innerHTML = `
      <div class="product-detail-page">
        <button class="back-btn" onclick="app.showPage('products')" style="margin-bottom: 2rem;">← Back to Products</button>
        
        <div class="product-detail-container">
          <div class="product-detail-image">
            ${product.image ? `<img src="${product.image}" alt="${product.name}">` : '<div class="placeholder-image" style="height: 100%; display: flex; align-items: center; justify-content: center; background: var(--glass);">No Image Available</div>'}
          </div>
          
          <div class="product-detail-info">
            <h1>${product.name}</h1>
            <div class="product-detail-price">रू ${product.price}/${product.unit}</div>
            
            <div class="product-detail-farmer">
              <div style="font-size: 2rem;">${farmer?.avatar || '👨‍🌾'}</div>
              <div>
                <h3>${product.farmer}</h3>
                <p style="opacity: 0.8;">Organic Farm</p>
              </div>
            </div>
            
            <div class="product-detail-stats">
              <div class="stat-card">
                <div class="stat-number">${rating.toFixed(1)}</div>
                <div class="stat-label">⭐ Rating</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">${product.nutritionScore}</div>
                <div class="stat-label">🥗 Nutrition</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">${product.stock}</div>
                <div class="stat-label">📦 Stock</div>
              </div>
            </div>
            
            <div class="product-detail-description">
              ${product.description}
            </div>
            
            <div class="certifications">
              ${product.certifications.map(cert => `<span class="cert-badge">${cert}</span>`).join('')}
            </div>
            
            <div class="quantity-selector">
              <label>Quantity:</label>
              <button onclick="changeDetailQuantity(-1)">-</button>
              <span id="detailQuantity">1</span>
              <button onclick="changeDetailQuantity(1)">+</button>
            </div>
            
            <div class="product-actions">
              <button class="cta-button" onclick="addToCartFromDetail(${product.id})" style="flex: 2;">
                Add to Cart - रू ${product.price}
              </button>
              <button class="wishlist-btn" onclick="toggleWishlist(${product.id})" style="flex: 1; background: var(--glass); border: 1px solid var(--glass-border);">
                ${this.wishlist.some(item => item.id === product.id) ? '❤️ Remove' : '🤍 Wishlist'}
              </button>
            </div>
          </div>
        </div>
        
        <div class="reviews-section">
          <h2>Customer Reviews (${reviews.length})</h2>
          <div id="reviewsList">
            ${reviews.length > 0 ? reviews.map(review => `
              <div class="review-card">
                <div class="review-header">
                  <div>
                    <strong>${review.userName}</strong>
                    <div class="stars">${'⭐'.repeat(review.rating)}</div>
                  </div>
                  <span style="opacity: 0.7;">${new Date(review.date).toLocaleDateString()}</span>
                </div>
                <p>${review.comment}</p>
              </div>
            `).join('') : '<p style="opacity: 0.7;">No reviews yet. Be the first to review this product!</p>'}
          </div>
          
          ${this.user ? `
            <div class="add-review" style="margin-top: 2rem;">
              <h3>Add Your Review</h3>
              <form onsubmit="submitReview(event, ${product.id})">
                <div style="margin-bottom: 1rem;">
                  <label>Rating:</label>
                  <select name="rating" required style="margin-left: 1rem; padding: 0.5rem; border-radius: 5px;">
                    <option value="5">5 ⭐⭐⭐⭐⭐</option>
                    <option value="4">4 ⭐⭐⭐⭐</option>
                    <option value="3">3 ⭐⭐⭐</option>
                    <option value="2">2 ⭐⭐</option>
                    <option value="1">1 ⭐</option>
                  </select>
                </div>
                <textarea name="comment" placeholder="Write your review..." required style="width: 100%; min-height: 100px; padding: 1rem; border-radius: 10px; background: var(--glass); border: 1px solid var(--glass-border); color: white; margin-bottom: 1rem;"></textarea>
                <button type="submit" class="cta-button">Submit Review</button>
              </form>
            </div>
          ` : '<p style="margin-top: 2rem; opacity: 0.7;">Please login to leave a review.</p>'}
        </div>
        
        <div class="recommendations-section">
          <h2>You Might Also Like</h2>
          <div class="recommendations-grid">
            ${recommendations.map(rec => this.createProductCard(rec)).join('')}
          </div>
        </div>
      </div>
    `;
    
    const existingDetail = document.getElementById('product-detail');
    if (existingDetail) {
      existingDetail.remove();
    }
    
    document.querySelector('main').appendChild(detailPage);
  }

  getProductRecommendations(product) {
    return this.products
      .filter(p => p.id !== product.id && (p.category === product.category || p.farmer === product.farmer))
      .slice(0, 3);
  }

  // Wishlist Management
  toggleWishlist(productId) {
    const existingIndex = this.wishlist.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
      this.wishlist.splice(existingIndex, 1);
      this.showToast('Removed from wishlist', 'success');
    } else {
      const product = this.products.find(p => p.id === productId);
      if (product) {
        this.wishlist.push(product);
        this.showToast('Added to wishlist ❤️', 'success');
      }
    }

    localStorage.setItem('khetbari_wishlist', JSON.stringify(this.wishlist));
    this.loadProducts(); // Refresh product display
  }

  // Cart Management
  addToCart(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    if (product.stock <= 0) {
      this.showToast('Sorry, this item is out of stock', 'error');
      return;
    }

    const existingItem = this.cart.find(item => item.id === productId);

    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        existingItem.quantity += 1;
      } else {
        this.showToast('Cannot add more - stock limit reached', 'error');
        return;
      }
    } else {
      this.cart.push({
        ...product,
        quantity: 1,
        addedAt: new Date().toISOString()
      });
    }

    // Update product stock
    product.stock -= 1;

    localStorage.setItem('khetbari_cart', JSON.stringify(this.cart));
    localStorage.setItem('khetbari_products', JSON.stringify(this.products));

    this.updateCartUI();
    this.showToast(`${product.name} added to cart! 🛒`, 'success');
    this.awardLoyaltyPoints(10); // 10 points for adding to cart
  }

  updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCount) {
      cartCount.textContent = totalItems;
      cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    this.updateCartSidebar();
  }

  updateCartSidebar() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (!cartItems) return;

    if (this.cart.length === 0) {
      cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
      if (cartTotal) cartTotal.textContent = '$0.00';
      return;
    }

    const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartItems.innerHTML = this.cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-image">
          ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">` : '<div style="width: 100%; height: 100%; background: var(--primary); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem;">No Image</div>'}
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">रू ${item.price}/${item.unit}</div>
          <div class="cart-item-farmer">by ${item.farmer}</div>
        </div>
        <div class="quantity-controls">
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
        </div>
      </div>
    `).join('');

    if (cartTotal) {
      cartTotal.innerHTML = `
        <div class="total-breakdown">
          <div class="subtotal">Subtotal: रू ${total.toFixed(0)}</div>
          <div class="delivery-fee">Delivery: रू 150</div>
          <div class="loyalty-discount">Loyalty Discount: -रू ${Math.min(total * 0.05, this.loyaltyPoints * 0.5).toFixed(0)}</div>
          <div class="total">Total: रू ${(total + 150 - Math.min(total * 0.05, this.loyaltyPoints * 0.5)).toFixed(0)}</div>
          <div class="carbon-total">🌱 Total Carbon: ${this.cart.reduce((sum, item) => sum + (item.carbonFootprint * item.quantity), 0).toFixed(1)}kg CO₂</div>
        </div>
      `;
    }
  }

  // Farmer Profiles
  loadFarmers() {
    const container = document.getElementById('farmersGrid');
    if (!container) return;

    container.innerHTML = this.farmers.map(farmer => this.createFarmerCard(farmer)).join('');
  }

  createFarmerCard(farmer) {
    return `
      <div class="farmer-card" onclick="showFarmerProfile(${farmer.id})">
        <div class="farmer-header">
          <div class="farmer-avatar">${farmer.avatar}</div>
          <div class="farmer-basic-info">
            <h3>${farmer.name}</h3>
            <p class="farmer-owner">👨‍🌾 ${farmer.owner}</p>
            <p class="farmer-location">📍 ${farmer.location}</p>
          </div>
        </div>

        <div class="farmer-stats">
          <div class="farmer-stat">
            <span class="farmer-stat-value">${farmer.rating}</span>
            <span class="farmer-stat-label">⭐ Rating</span>
          </div>
          <div class="farmer-stat">
            <span class="farmer-stat-value">${farmer.farmSize}</span>
            <span class="farmer-stat-label">🚜 Farm Size</span>
          </div>
          <div class="farmer-stat">
            <span class="farmer-stat-value">${farmer.experience}</span>
            <span class="farmer-stat-label">👨‍🌾 Experience</span>
          </div>
        </div>

        <div class="farmer-contact">
          <div class="farmer-rating">
            <span class="stars">${'⭐'.repeat(Math.floor(farmer.rating))}</span>
            <span>${farmer.rating}</span>
          </div>
          <div class="farmer-distance">
            ${farmer.distanceFromUser ? `📍 ${farmer.distanceFromUser}` : '📍 Available'}
          </div>
        </div>

        <div class="certifications">
          ${farmer.certifications.map(cert => `<span class="cert-badge">${cert}</span>`).join('')}
        </div>

        <div class="farmer-products">
          <h4>🌱 Specializes in:</h4>
          <div class="farmer-products-list">
            ${farmer.products.map(product => `<span class="product-tag">${product}</span>`).join('')}
          </div>
        </div>

        <div class="farmer-story">"${farmer.story}"</div>

        <div class="farmer-actions">
          <button class="chat-btn" onclick="event.stopPropagation(); startChat(${farmer.id})">💬 Chat</button>
          <button class="visit-btn" onclick="event.stopPropagation(); bookFarmVisit(${farmer.id})">🚜 Visit Farm</button>
        </div>
      </div>
    `;
  }

  // Subscription Management
  createSubscription(products, frequency, customization) {
    const subscription = {
      id: Date.now(),
      products: products,
      frequency: frequency, // weekly, biweekly, monthly
      customization: customization,
      status: 'active',
      nextDelivery: this.calculateNextDelivery(frequency),
      totalSavings: 0,
      createdAt: new Date().toISOString()
    };

    this.subscriptions.push(subscription);
    localStorage.setItem('khetbari_subscriptions', JSON.stringify(this.subscriptions));

    this.showToast('Subscription created! 📦', 'success');
    this.awardLoyaltyPoints(100); // Bonus points for subscription
  }

  loadSubscriptions() {
    const container = document.getElementById('activeSubscriptions');
    if (!container) return;

    if (this.subscriptions.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: rgba(255,255,255,0.6);">
          <div style="font-size: 4rem; margin-bottom: 1rem;">📦</div>
          <h3>No active subscriptions</h3>
          <p>Choose from our subscription options above to get started!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <h3 style="color: var(--primary); margin-bottom: 2rem;">Active Subscriptions</h3>
      ${this.subscriptions.map(sub => `
        <div class="subscription-item" style="background: var(--glass); border: 1px solid var(--glass-border); border-radius: 15px; padding: 1.5rem; margin-bottom: 1rem;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
            <div>
              <h4>${sub.products?.length > 0 ? sub.products[0].name || 'Custom Box' : 'Subscription Box'}</h4>
              <p style="opacity: 0.8; font-size: 0.9rem;">Frequency: ${sub.frequency}</p>
              <p style="opacity: 0.8; font-size: 0.9rem;">Next delivery: ${new Date(sub.nextDelivery).toLocaleDateString()}</p>
            </div>
            <span style="padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; background: rgba(34, 197, 94, 0.2); color: #22c55e;">
              ${sub.status.toUpperCase()}
            </span>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button onclick="pauseSubscription(${sub.id})" style="background: var(--glass); border: 1px solid var(--glass-border); color: white; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">
              Pause
            </button>
            <button onclick="modifySubscription(${sub.id})" style="background: var(--primary); border: none; color: white; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">
              Modify
            </button>
            <button onclick="cancelSubscription(${sub.id})" style="background: #ef4444; border: none; color: white; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">
              Cancel
            </button>
          </div>
        </div>
      `).join('')}
    `;
  }

  // Reviews and Ratings
  addReview(productId, rating, comment, photos = []) {
    if (!this.reviews[productId]) {
      this.reviews[productId] = [];
    }

    const review = {
      id: Date.now(),
      userId: this.user?.id || 'anonymous',
      userName: this.user?.name || 'Anonymous',
      rating: rating,
      comment: comment,
      photos: photos,
      date: new Date().toISOString(),
      helpful: 0
    };

    this.reviews[productId].push(review);
    localStorage.setItem('khetbari_reviews', JSON.stringify(this.reviews));

    this.awardLoyaltyPoints(20); // Points for reviewing
    this.showToast('Review added! Thank you! 🌟', 'success');
  }

  getProductRating(productId) {
    const productReviews = this.reviews[productId] || [];
    if (productReviews.length === 0) return 4.5; // Default rating

    const total = productReviews.reduce((sum, review) => sum + review.rating, 0);
    return total / productReviews.length;
  }

  getProductReviewCount(productId) {
    return (this.reviews[productId] || []).length;
  }

  // Loyalty System
  awardLoyaltyPoints(points) {
    this.loyaltyPoints += points;
    localStorage.setItem('khetbari_loyalty_points', this.loyaltyPoints.toString());

    // Show point notification
    this.showPointsNotification(points);
  }

  showPointsNotification(points) {
    const notification = document.createElement('div');
    notification.className = 'points-notification';
    notification.innerHTML = `+${points} points! 🎉`;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }

  // Recipe Suggestions
  getSuggestedRecipes(productIds) {
    const allRecipes = productIds.flatMap(id => {
      const product = this.products.find(p => p.id === id);
      return product ? product.recipes : [];
    });

    return [...new Set(allRecipes)]; // Remove duplicates
  }

  // Voice Search
  initializeVoiceSearch() {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const searchTerm = event.results[0][0].transcript;
        const searchBox = document.getElementById('searchBox');
        if (searchBox) {
          searchBox.value = searchTerm;
          this.loadProducts();
        }
        this.showToast(`Searching for: ${searchTerm} 🎤`, 'success');
      };

      window.startVoiceSearch = () => {
        recognition.start();
        this.showToast('Listening... 🎤', 'success');
      };
    }
  }

  // Carbon Footprint Tracking
  trackCarbonFootprint() {
    const totalCarbon = this.cart.reduce((sum, item) => sum + (item.carbonFootprint * item.quantity), 0);
    return totalCarbon;
  }

  // Weather-based Recommendations
  getWeatherRecommendations() {
    // Simulated weather-based recommendations
    const seasonalProducts = this.products.filter(p => p.inSeason);
    return seasonalProducts.slice(0, 3);
  }

  // Smart Shopping Lists
  generateSmartShoppingList() {
    const recommendations = [];

    // Based on purchase history
    const frequentProducts = this.getFrequentlyBoughtProducts();
    recommendations.push(...frequentProducts);

    // Based on season
    const seasonalRecs = this.getWeatherRecommendations();
    recommendations.push(...seasonalRecs);

    // Based on nutrition needs
    const nutritionRecs = this.getNutritionRecommendations();
    recommendations.push(...nutritionRecs);

    return [...new Set(recommendations)]; // Remove duplicates
  }

  // Notification System
  initializeNotifications() {
    if ('Notification' in window && Notification.permission === 'granted') {
      this.sendWelcomeNotification();
    }
  }

  sendNotification(title, options) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, options);
    }
  }

  // Event Binding
  bindEvents() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const page = item.dataset.page;
        this.showPage(page);
      });
    });

    // Search and filter
    const searchBox = document.getElementById('searchBox');
    if (searchBox) {
      searchBox.addEventListener('input', () => this.loadProducts());
    }

    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', () => this.loadProducts());
    }

    // Forms
    const sellForm = document.getElementById('sellForm');
    if (sellForm) {
      sellForm.addEventListener('submit', (e) => this.handleSellForm(e));
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => this.handleContactForm(e));
    }
  }

  handleContactForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Simulate form submission
    this.showToast('Message sent successfully! We\'ll get back to you soon. 📧', 'success');
    e.target.reset();
    
    // In a real app, you would send this to a server or service like Formspree
    console.log('Contact form submission:', {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    });
  }

  // Security and Performance Features
  enforceHTTPS() {
    if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
      location.replace(`https:${location.href.substring(location.protocol.length)}`);
    }
  }

  sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }

  initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
  }

  initializeDropdownClickOutside() {
    document.addEventListener('click', (e) => {
      const profileDropdown = document.querySelector('.profile-dropdown');
      if (profileDropdown && !profileDropdown.contains(e.target)) {
        profileDropdown.classList.remove('open');
      }

      const advancedFilters = document.getElementById('advancedFilters');
      const filterBtn = document.querySelector('.filter-btn');
      if (advancedFilters && !advancedFilters.contains(e.target) && e.target !== filterBtn) {
        advancedFilters.classList.remove('open');
      }
    });
  }

  initializeImageOptimization() {
    // Add lazy loading to all images
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            observer.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }

  // Enhanced Authentication
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password) {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[@$!%*?&]/.test(password);
    
    return {
      isValid: minLength && hasUpper && hasLower && hasNumber && hasSpecial,
      strength: this.calculatePasswordStrength(password),
      requirements: { minLength, hasUpper, hasLower, hasNumber, hasSpecial }
    };
  }

  calculatePasswordStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;
    
    if (score <= 2) return 'weak';
    if (score <= 4) return 'medium';
    return 'strong';
  }

  showFieldError(fieldId, message) {
    const errorElement = document.getElementById(fieldId);
    const inputElement = document.querySelector(`[aria-describedby="${fieldId}"]`);
    
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
    
    if (inputElement) {
      inputElement.classList.add('error');
    }
  }

  clearFieldError(fieldId) {
    const errorElement = document.getElementById(fieldId);
    const inputElement = document.querySelector(`[aria-describedby="${fieldId}"]`);
    
    if (errorElement) {
      errorElement.style.display = 'none';
    }
    
    if (inputElement) {
      inputElement.classList.remove('error');
    }
  }

  clearAllErrors() {
    document.querySelectorAll('.field-error').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.form-input.error, .form-textarea.error').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
  }

  setLoadingState(buttonId, isLoading) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    const textSpan = button.querySelector('.btn-text');
    const spinnerSpan = button.querySelector('.btn-spinner');
    
    if (isLoading) {
      button.disabled = true;
      if (textSpan) textSpan.style.display = 'none';
      if (spinnerSpan) spinnerSpan.style.display = 'inline';
    } else {
      button.disabled = false;
      if (textSpan) textSpan.style.display = 'inline';
      if (spinnerSpan) spinnerSpan.style.display = 'none';
    }
  }

  // Utility Functions
  createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particlesContainer.appendChild(particle);
    }
  }

  showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  calculateNextDelivery(frequency) {
    const now = new Date();
    const days = frequency === 'weekly' ? 7 : frequency === 'biweekly' ? 14 : 30;
    return new Date(now.getTime() + (days * 24 * 60 * 60 * 1000));
  }

  handleSellForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Get certifications from checkboxes
    const certifications = [];
    const certInputs = e.target.querySelectorAll('input[name="certifications"]:checked');
    certInputs.forEach(input => certifications.push(input.value));

    // Handle image upload
    const imageFile = formData.get('productImage');
    let imageUrl = null;
    
    if (imageFile && imageFile.size > 0) {
      // Create a local URL for the image (in a real app, you'd upload to a server)
      imageUrl = URL.createObjectURL(imageFile);
    }

    const newProduct = {
      id: Date.now(),
      name: formData.get('productName'),
      description: formData.get('productDesc'),
      price: parseFloat(formData.get('productPrice')),
      unit: formData.get('productUnit'),
      category: formData.get('productCategory'),
      farmer: formData.get('farmerName'),
      farmerId: Date.now() + 1, // Generate unique farmer ID
      stock: parseInt(formData.get('productStock')),
      image: imageUrl,
      certifications: certifications,
      inSeason: formData.get('inSeason') === 'true',
      nutritionScore: Math.floor(Math.random() * 30) + 70, // Random score 70-100
      carbonFootprint: Math.random() * 0.5 + 0.2, // Random 0.2-0.7
      harvestDate: new Date().toISOString().split('T')[0],
      shelfLife: this.getShelfLife(formData.get('productCategory')),
      recipes: this.getSuggestedRecipesForProduct(formData.get('productName'))
    };

    this.products.push(newProduct);
    localStorage.setItem('khetbari_products', JSON.stringify(this.products));

    this.showToast(`${newProduct.name} added successfully! 🎉`, 'success');
    this.awardLoyaltyPoints(50);

    e.target.reset();
    this.showPage('products');
  }

  getShelfLife(category) {
    const shelfLives = {
      'vegetables': ['5 days', '7 days', '10 days', '14 days'],
      'fruits': ['3 days', '5 days', '7 days', '10 days'],
      'herbs': ['3 days', '5 days'],
      'grains': ['30 days', '60 days', '90 days'],
      'dairy': ['5 days', '7 days', '10 days'],
      'other': ['7 days', '14 days', '30 days']
    };

    const options = shelfLives[category] || shelfLives['other'];
    return options[Math.floor(Math.random() * options.length)];
  }

  getSuggestedRecipesForProduct(productName) {
    const recipes = {
      'tomato': ['Caprese Salad', 'Tomato Soup', 'Fresh Salsa', 'Pasta Sauce'],
      'carrot': ['Carrot Cake', 'Roasted Carrots', 'Carrot Soup', 'Carrot Sticks'],
      'lettuce': ['Caesar Salad', 'Garden Salad', 'Lettuce Wraps', 'BLT Sandwich'],
      'apple': ['Apple Pie', 'Apple Sauce', 'Apple Crisp', 'Caramel Apples'],
      'berry': ['Berry Smoothie', 'Berry Pie', 'Berry Parfait', 'Jam'],
      'herb': ['Pesto', 'Tea', 'Seasoning', 'Herb Butter']
    };

    const name = productName.toLowerCase();
    for (const [key, recipeList] of Object.entries(recipes)) {
      if (name.includes(key)) {
        return recipeList.slice(0, 3); // Return 3 recipes
      }
    }

    return ['Fresh Eating', 'Cooking', 'Baking'];
  }
}

// Global functions for HTML onclick handlers
let app;

window.addEventListener('DOMContentLoaded', () => {
  app = new KhetBariApp();
});

// Authentication functions
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));

  document.querySelector(`[onclick="switchAuthTab('${tab}')"]`).classList.add('active');
  document.getElementById(tab + 'Form').classList.add('active');
}

function selectAccountType(type) {
  document.querySelectorAll('.account-type-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-type="${type}"]`).classList.add('active');

  const farmerFields = document.getElementById('farmerFields');
  if (type === 'seller') {
    farmerFields.style.display = 'block';
  } else {
    farmerFields.style.display = 'none';
  }
}

function handleLogin(event) {
  event.preventDefault();
  app.clearAllErrors();
  app.setLoadingState('loginSubmitBtn', true);

  const formData = new FormData(event.target);
  const email = formData.get('email');
  const password = formData.get('password');

  // Validate inputs
  let hasError = false;

  if (!app.validateEmail(email)) {
    app.showFieldError('email-error', 'Please enter a valid email address');
    hasError = true;
  }

  if (!password || password.length < 8) {
    app.showFieldError('password-error', 'Password must be at least 8 characters');
    hasError = true;
  }

  if (hasError) {
    app.setLoadingState('loginSubmitBtn', false);
    return;
  }

  // Simulate login with delay
  setTimeout(() => {
    const user = {
      id: Date.now(),
      name: 'John Doe',
      email: app.sanitizeInput(email),
      type: 'buyer',
      phone: '+977-9841234567',
      address: 'Kathmandu, Nepal'
    };

    app.user = user;
    localStorage.setItem('khetbari_user', JSON.stringify(user));

    app.setLoadingState('loginSubmitBtn', false);
    app.showToast('Login successful! Welcome back! 🎉', 'success');
    app.updateUserUI();
    app.showPage('home');
  }, 1500);
}

function handleRegister(event) {
  event.preventDefault();
  app.clearAllErrors();
  app.setLoadingState('registerSubmitBtn', true);

  const formData = new FormData(event.target);
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');
  const phone = formData.get('phone');
  const address = formData.get('address');

  // Validate inputs
  let hasError = false;

  if (!name || name.length < 2) {
    app.showFieldError('name-error', 'Name must be at least 2 characters');
    hasError = true;
  }

  if (!app.validateEmail(email)) {
    app.showFieldError('register-email-error', 'Please enter a valid email address');
    hasError = true;
  }

  const passwordValidation = app.validatePassword(password);
  if (!passwordValidation.isValid) {
    app.showFieldError('register-password-error', 'Password must meet all requirements');
    hasError = true;
  }

  if (password !== confirmPassword) {
    app.showFieldError('confirm-password-error', 'Passwords do not match');
    hasError = true;
  }

  if (!phone || phone.length < 10) {
    app.showFieldError('phone-error', 'Please enter a valid phone number');
    hasError = true;
  }

  if (!address || address.length < 10) {
    app.showFieldError('address-error', 'Please enter a complete address');
    hasError = true;
  }

  if (hasError) {
    app.setLoadingState('registerSubmitBtn', false);
    return;
  }

  // Simulate registration with delay
  setTimeout(() => {
    const accountType = document.querySelector('.account-type-btn.active').dataset.type;

    const user = {
      id: Date.now(),
      name: app.sanitizeInput(name),
      email: app.sanitizeInput(email),
      type: accountType,
      phone: app.sanitizeInput(phone),
      address: app.sanitizeInput(address),
      farmName: formData.get('farmName') ? app.sanitizeInput(formData.get('farmName')) : null,
      farmAddress: formData.get('farmAddress') ? app.sanitizeInput(formData.get('farmAddress')) : null
    };

    app.user = user;
    localStorage.setItem('khetbari_user', JSON.stringify(user));

    // If farmer account, add to farmers list
    if (accountType === 'seller' && formData.get('farmName')) {
      const newFarmer = {
        id: Date.now(),
        name: app.sanitizeInput(formData.get('farmName')),
        owner: app.sanitizeInput(name),
        location: formData.get('farmAddress') ? app.sanitizeInput(formData.get('farmAddress')) : app.sanitizeInput(address),
        coordinates: { lat: 27.7172 + Math.random() * 0.1, lng: 85.3240 + Math.random() * 0.1 },
        address: formData.get('farmAddress') ? app.sanitizeInput(formData.get('farmAddress')) : app.sanitizeInput(address),
        certifications: ["Organic"],
        rating: 4.0,
        story: "New farmer committed to sustainable farming practices.",
        products: [],
        avatar: "👨‍🌾",
        farmSize: "20 acres",
        experience: "Starting",
        specialties: ["Fresh produce"],
        visits: 0,
        totalSales: 0,
        visitingHours: "9:00 AM - 5:00 PM",
        phone: app.sanitizeInput(phone),
        email: app.sanitizeInput(email)
      };

      app.farmers.push(newFarmer);
      localStorage.setItem('khetbari_farmers', JSON.stringify(app.farmers));
    }

    app.setLoadingState('registerSubmitBtn', false);
    app.showToast('Account created successfully! Welcome to KhetBari! 🌱', 'success');
    app.updateUserUI();
    app.showPage('home');
  }, 2000);
}

function socialLogin(provider) {
  // Simulate social login with mock data
  const mockUsers = {
    google: {
      id: Date.now(),
      name: 'John Smith',
      email: 'john.smith@gmail.com',
      type: 'buyer',
      phone: '+977-9841234567',
      address: 'Kathmandu, Nepal',
      provider: 'google'
    },
    facebook: {
      id: Date.now(),
      name: 'Jane Doe',
      email: 'jane.doe@facebook.com',
      type: 'buyer',
      phone: '+977-9841234568',
      address: 'Pokhara, Nepal',
      provider: 'facebook'
    },
    apple: {
      id: Date.now(),
      name: 'Alex Johnson',
      email: 'alex.johnson@icloud.com',
      type: 'buyer',
      phone: '+977-9841234569',
      address: 'Chitwan, Nepal',
      provider: 'apple'
    }
  };

  const user = mockUsers[provider];
  if (user) {
    app.user = user;
    localStorage.setItem('khetbari_user', JSON.stringify(user));
    
    app.showToast(`Logged in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}! 🎉`, 'success');
    app.updateUserUI();
    app.showPage('home');
  } else {
    app.showToast(`${provider} login failed. Please try again.`, 'error');
  }
}

function logout() {
  app.user = null;
  localStorage.removeItem('khetbari_user');
  app.updateUserUI();
  app.showToast('Logged out successfully!', 'success');
  app.showPage('home');
}

function toggleProfileMenu() {
  const dropdown = document.querySelector('.profile-dropdown');
  dropdown.classList.toggle('open');
}

function showPage(pageId) {
  app.showPage(pageId);
}

function startShopping() {
  app.showPage('products');
}

function toggleCart() {
  const sidebar = document.querySelector('.cart-sidebar');
  sidebar.classList.toggle('open');
}

function addToCart(productId) {
  app.addToCart(productId);
}

function toggleWishlist(productId) {
  app.toggleWishlist(productId);
}

function updateQuantity(productId, change) {
  const item = app.cart.find(item => item.id === productId);
  if (!item) return;

  const product = app.products.find(p => p.id === productId);

  if (change > 0 && item.quantity >= product.stock + item.quantity) {
    app.showToast('Cannot add more - stock limit reached', 'error');
    return;
  }

  item.quantity += change;

  if (item.quantity <= 0) {
    app.cart = app.cart.filter(i => i.id !== productId);
    product.stock += Math.abs(change);
  } else if (change > 0) {
    product.stock -= 1;
  } else {
    product.stock += 1;
  }

  localStorage.setItem('khetbari_cart', JSON.stringify(app.cart));
  localStorage.setItem('khetbari_products', JSON.stringify(app.products));

  app.updateCartUI();
}

function checkout() {
  if (!app.user) {
    app.showToast('Please login to checkout', 'error');
    app.showPage('auth');
    return;
  }

  if (app.cart.length === 0) {
    app.showToast('Your cart is empty!', 'error');
    return;
  }

  // Create order
  const order = {
    id: Date.now(),
    items: [...app.cart],
    total: app.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    status: 'pending',
    date: new Date().toISOString(),
    deliveryAddress: app.user.address
  };

  app.orders.push(order);
  localStorage.setItem('khetbari_orders', JSON.stringify(app.orders));

  // Clear cart
  app.cart = [];
  localStorage.setItem('khetbari_cart', JSON.stringify(app.cart));
  app.updateCartUI();

  app.awardLoyaltyPoints(Math.floor(order.total * 10)); // 10 points per dollar
  app.showToast('Order placed successfully! 🎉', 'success');
  app.showPage('success');
}


function showFarmerProfile(farmerId) {
  const farmer = app.farmers.find(f => f.id === farmerId);
  if (!farmer) return;

  app.showToast(`Viewing ${farmer.name} profile`, 'success');
  // Implementation would show detailed farmer profile
}

function startChat(farmerId) {
  app.showToast('Chat feature coming soon! 💬', 'success');
}

function bookFarmVisit(farmerId) {
  const farmer = app.farmers.find(f => f.id === farmerId);
  if (farmer) {
    farmer.visits += 1;
    localStorage.setItem('khetbari_farmers', JSON.stringify(app.farmers));
    app.showToast(`Farm visit booked with ${farmer.name}! 🚜`, 'success');
  }
}

function getDirectionsOSM(lat, lng) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      // Open OSM centered at user's location with zoom level 15 (adjust zoom as you want)
      const url = `https://www.openstreetmap.org/#map=15/${userLat}/${userLng}`;
      window.open(url, '_blank');
    }, () => {
      // Fallback: center map on target location if geolocation fails
      const url = `https://www.openstreetmap.org/#map=15/${lat}/${lng}`;
      window.open(url, '_blank');
    });
  } else {
    // Browser doesn't support geolocation
    const url = `https://www.openstreetmap.org/#map=15/${lat}/${lng}`;
    window.open(url, '_blank');
  }
}

// Advanced filter functions
function toggleAdvancedFilters() {
  const filters = document.getElementById('advancedFilters');
  filters.classList.toggle('open');
}

function updatePriceFilter() {
  const range = document.getElementById('priceRange');
  const display = document.getElementById('priceRangeValue');
  display.textContent = `0-${range.value}`;
  app.loadProducts();
}

function updateFilters() {
  app.loadProducts();
}

// Settings functions
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('khetbari_dark_mode', document.body.classList.contains('dark-mode'));
}

function saveSettings() {
  const settings = {
    darkMode: document.getElementById('darkMode').checked,
    autoSaveCart: document.getElementById('autoSaveCart').checked,
    showNutrition: document.getElementById('showNutrition').checked,
    deliveryTime: document.getElementById('deliveryTime').value,
    deliveryInstructions: document.getElementById('deliveryInstructions').value,
    shareHistory: document.getElementById('shareHistory').checked,
    locationTracking: document.getElementById('locationTracking').checked,
    emailNotifications: document.getElementById('emailNotifications').checked,
    smsNotifications: document.getElementById('smsNotifications').checked,
    marketingEmails: document.getElementById('marketingEmails').checked
  };

  localStorage.setItem('khetbari_settings', JSON.stringify(settings));
  app.showToast('Settings saved successfully! ⚙️', 'success');
}

function showProductDetails(productId) {
  app.showProductDetail(productId);
}

function changeDetailQuantity(change) {
  const quantityElement = document.getElementById('detailQuantity');
  let quantity = parseInt(quantityElement.textContent);
  quantity = Math.max(1, quantity + change);
  quantityElement.textContent = quantity;
}

function addToCartFromDetail(productId) {
  const quantity = parseInt(document.getElementById('detailQuantity').textContent);
  for (let i = 0; i < quantity; i++) {
    app.addToCart(productId);
  }
}

function submitReview(event, productId) {
  event.preventDefault();
  const formData = new FormData(event.target);
  
  app.addReview(
    productId,
    parseInt(formData.get('rating')),
    formData.get('comment')
  );
  
  event.target.reset();
  showProductDetails(productId); // Refresh the page
}

function handleContactForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  
  // Simulate form submission
  app.showToast('Message sent successfully! We\'ll get back to you soon. 📧', 'success');
  event.target.reset();
  
  // In a real app, you would send this to a server or service like Formspree
  console.log('Contact form submission:', {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message')
  });
}

// New utility functions
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function handleGoogleSignIn() {
  // In a real implementation, this would use Google Sign-In SDK
  app.showToast('Google Sign-In integration requires server setup. Using demo login...', 'info');
  
  // Simulate Google login
  setTimeout(() => {
    const user = {
      id: Date.now(),
      name: 'Google User',
      email: 'user@gmail.com',
      type: 'buyer',
      phone: '+977-9841234567',
      address: 'Kathmandu, Nepal',
      provider: 'google'
    };

    app.user = user;
    localStorage.setItem('khetbari_user', JSON.stringify(user));
    
    app.showToast('Logged in with Google! 🎉', 'success');
    app.updateUserUI();
    app.showPage('home');
  }, 1000);
}

function showPasswordReset() {
  const email = prompt('Enter your email address for password reset:');
  if (email && app.validateEmail(email)) {
    app.showToast('Password reset link sent to your email! 📧', 'success');
  } else if (email) {
    app.showToast('Please enter a valid email address', 'error');
  }
}

// Password strength indicator
document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.querySelector('input[name="password"]');
  const strengthIndicator = document.getElementById('passwordStrength');
  
  if (passwordInput && strengthIndicator) {
    passwordInput.addEventListener('input', (e) => {
      const password = e.target.value;
      const strength = app.calculatePasswordStrength(password);
      
      strengthIndicator.textContent = `Password strength: ${strength}`;
      strengthIndicator.className = `password-strength ${strength}`;
    });
  }
});