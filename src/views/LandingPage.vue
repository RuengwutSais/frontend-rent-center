<template>
  <div>
    <header class="header">
      <div class="coniainer-fluid">
        <div class="navb-logo">
          <img class="img-logo" src="@/assets/logo.png" alt="logo" />
        </div>
        <div class="navb-items">
          <div class="items">
            <button class="button-nav">ลงทะเบียน</button>
          </div>
          <div class="items">
            <button class="button-nav">เข้าสู่ระบบ</button>
          </div>
          <!-- Button trigger modal -->
          <div class="mobile-toggler">
            <a href="#" data-toggle="modal" data-target="#navbarmodal">
              <i class="fa-solid fa-bars"></i>
            </a>
          </div>
        </div>
        <div
          class="modal fade"
          id="navbarmodal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <img
                  class="img-logo"
                  src="@/assets/logo.png"
                  alt="logo-mobile"
                />
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <i class="fa-sharp fa-solid fa-xmark"></i>
                </button>
              </div>
              <div class="modal-body">
                <div>
                  <button class="modal-button">ลงทะเบียน</button>
                </div>
                <div>
                  <button class="modal-button">เข้าสู่ระบบ</button>
                </div>
              </div>
              <div class="modal-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="picture-search">
      <div class="search-div">
        <div class="search-button">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fa fa-search"></i></span>
            </div>
            <input type="text" class="search-landing" placeholder="Search" />
          </div>
          <span><button class="button-search">ค้นหา</button></span>
        </div>
        <div class="dropdown-wrapper">
          <div class="dropdown-box">
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdown1"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown 1
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdown1">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
          </div>
          <div class="dropdown-box">
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdown2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown 2
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdown2">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
          </div>
          <div class="dropdown-box">
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdown3"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown 3
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdown3">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
          </div>
          <div class="dropdown-box">
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdown4"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown 4
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdown4">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
          </div>
          <div class="dropdown-box">
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdown4"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown 5
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdown5">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="estate-pop">
        <h1>คอนโดแนะนำ</h1>
        <div class="more-estate">
          <a href="">ดูคอนโดเพิ่มเติม ></a>
        </div>
        <div class="slider-estate">
          <div class="card-container">
            <div
              class="card"
              v-for="(estate, index) in condos.slice(0, maxCard)"
              :key="index"
              :style="{ transform: `translateX(-${translateValue}%)` }"
            >
              <div class="card-img">
                <img :src="estate.image" alt="estate image" />
              </div>
              <div class="card-info">
                <div class="card-name">
                  <p>{{ estate.name }}</p>
                </div>
                <div class="card-price">
                  <i class="fa-solid fa-tag"></i><p>{{ estate.price }}</p>
                </div>
                <div class="card-location">
                  <i class="fa-solid fa-location-dot"></i><p>{{ estate.location }}</p>
                </div>
                <div class="estate-room">
                  <div class="card-bedroom">
                    <i class="fa-solid fa-bed"></i><p>{{ estate.bedroom }}</p>
                  </div>
                  <div class="card-bathroom">
                    <i class="fa-solid fa-bath"></i><p>{{ estate.bathroom }}</p>
                  </div>
                </div>
                <div class="estate-area">
                  <div class="card-floor">
                    <i class="fa-solid fa-stairs"></i><p>{{ estate.floor }}</p>
                  </div>
                  <div class="card-area">
                    <i class="fa-solid fa-chart-area"></i><p>{{ estate.area }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="btn-condo">
            <button
              class="btn left-btn"
              @click="slideCondoLeft"
              :disabled="translateValue === 0"
            >
              &lt;
            </button>
            <button
              class="btn right-btn"
              @click="slideCondoRight"
              :disabled="translateValue === (condos.length - maxCard) * 100"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
      <div class="estate-pop">
        <h1>บ้านเดี่ยวแนะนำ</h1>
        <div class="more-estate">
          <a href="">ดูบ้านเดี่ยวเพิ่มเติม ></a>
        </div>
        <div class="slider-estate border-danger">
          <div class="card-container">
            <div
              class="card"
              v-for="(estate, index) in estates.slice(0, maxCard)"
              :key="index"
              :style="{ transform: `translateX(-${translateValue}%)` }"
            >
              <div class="card-img">
                <img :src="estate.image" alt="estate image" />
              </div>
              <div class="card-info">
                <div class="card-name">
                  <p>{{ estate.name }}</p>
                </div>
                <div class="card-price">
                  <i class="fa-solid fa-tag"></i><p>{{ estate.price }}</p>
                </div>
                <div class="card-location">
                  <i class="fa-solid fa-location-dot"></i><p>{{ estate.location }}</p>
                </div>
                <div class="estate-room">
                  <div class="card-bedroom">
                    <i class="fa-solid fa-bed"></i><p>{{ estate.bedroom }}</p>
                  </div>
                  <div class="card-bathroom">
                    <i class="fa-solid fa-bath"></i><p>{{ estate.bathroom }}</p>
                  </div>
                </div>
                <div class="estate-area">
                  <div class="card-floor">
                    <i class="fa-solid fa-stairs"></i><p>{{ estate.floor }}</p>
                  </div>
                  <div class="card-area">
                    <i class="fa-solid fa-chart-area"></i><p>{{ estate.area }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="btn-condo">
            <button
              class="btn left-btn"
              @click="slideEstateLeft"
              :disabled="translateValue === 0"
            >
              &lt;
            </button>
            <button
              class="btn right-btn"
              @click="slideEstateRight"
              :disabled="translateValue === (estates.length - maxCard) * 100"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
      <div class="estate-pop">
        <h1>ทาวน์เฮ้าส์แนะนำ</h1>
        <div class="more-estate">
          <a href="">ดูทาวน์เฮ้าส์เพิ่มเติม ></a>
        </div>
        <div class="slider-estate">
          <div class="card-container">
            <div
              class="card"
              v-for="(estate, index) in townhouses.slice(0, maxCard)"
              :key="index"
              :style="{ transform: `translateX(-${translateValue}%)` }"
            >
              <div class="card-img">
                <img :src="estate.image" alt="estate image" />
              </div>
              <div class="card-info">
                <div class="card-name">
                  <p>{{ estate.name }}</p>
                </div>
                <div class="card-price">
                  <i class="fa-solid fa-tag"></i><p>{{ estate.price }}</p>
                </div>
                <div class="card-location">
                  <i class="fa-solid fa-location-dot"></i><p>{{ estate.location }}</p>
                </div>
                <div class="estate-room">
                  <div class="card-bedroom">
                    <i class="fa-solid fa-bed"></i><p>{{ estate.bedroom }}</p>
                  </div>
                  <div class="card-bathroom">
                    <i class="fa-solid fa-bath"></i><p>{{ estate.bathroom }}</p>
                  </div>
                </div>
                <div class="estate-area">
                  <div class="card-floor">
                    <i class="fa-solid fa-stairs"></i><p>{{ estate.floor }}</p>
                  </div>
                  <div class="card-area">
                    <i class="fa-solid fa-chart-area"></i><p>{{ estate.area }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="btn-condo">
            <button
              class="btn left-btn"
              @click="slideTownhouseLeft"
              :disabled="translateValue === 0"
            >
              &lt;
            </button>
            <button
              class="btn right-btn"
              @click="slideTownhouseRight"
              :disabled="translateValue === (townhouses.length - maxCard) * 100"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>    
    <footer class="footer">
    <div class="footer-container">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <p class="company-name">Rent Central</p>
          <p>@ Copy Right</p>
        </div>
        <div class="col-sm-12 col-md-6">
          <ul class="footer-links">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</div>
</template>

<script>
export default {
  name: "EstateInfo",
  data() {
    return {
      condos: [
        {
          price: "Condo price",
          name: "Condo name",
          location: "Condo location",
          bedroom: "N/A",
          bathroom: "N/A",
          floor: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+1",
        },
        {
          price: "Condo price",
          name: "Condo name",
          location: "Condo location",
          bedroom: "N/A",
          bathroom: "N/A",
          floor: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+2",
        },
        {
          price: "Condo price",
          name: "Condo name",
          location: "Condo location",
          bedroom: "N/A",
          bathroom: "N/A",
          floor: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+3",
        },
        {
          price: "Condo price",
          name: "Condo name",
          location: "Condo location",
          bedroom: "N/A",
          bathroom: "N/A",
          floor: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+4",
        },
        {
          price: "Condo price",
          name: "Condo name",
          location: "Condo location",
          bedroom: "N/A",
          bathroom: "N/A",
          floor: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+5",
        },
      ],
      estates: [
        {
          price: "Estates price",
          name: "Estates name",
          location: "Estates location",
          bedroom: "N/A",
          bathroom: "N/A",
          floor: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+1",
        },
        {
          price: "Estates price",
          name: "Estates name",
          location: "Estates location",
          bedroom: "N/A",
          bathroom: "N/A",
          floor: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+2",
        },
        {
          price: "Estates price",
          name: "Estates name",
          location: "Estates location",
          bedroom: "N/A",
          bathroom: "N/A",
          floor: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+3",
        },
        {
          price: "Estates price",
          name: "Estates name",
          location: "Estates location",
          bedroom: "N/A",
          bathroom: "N/A",
          floor: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+4",
        },
        {
          price: "Estates price",
          name: "Estates name",
          location: "Estates location",
          bedroom: "N/A",
          bathroom: "N/A",
          floor: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+5",
        },
      ],
      townhouses: [
        {
          price: "Townhouse price",
          name: "Townhouse name",
          location: "Townhouse location",
          bedroom: "N/A",
          bathroom: "N/A",
          floor: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+1",
        },
        {
          price: "Townhouse price",
          name: "Townhouse name",
          location: "Townhouse location",
          bedroom: "N/A",
          bathroom: "N/A",
          floor: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+2",
        },
        {
          price: "Townhouse price",
          name: "Townhouse name",
          location: "Townhouse location",
          bedroom: "N/A",
          bathroom: "N/A",
          floor: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+3",
        },
        {
          price: "Townhouse price",
          name: "Townhouse name",
          location: "Townhouse location",
          bedroom: "N/A",
          bathroom: "N/A",
          floor: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+4",
        },
        {
          price: "Townhouse price",
          name: "Townhouse name",
          location: "Townhouse location",
          bedroom: "N/A",
          bathroom: "N/A",
          floor: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+5",
        },
      ],
      translateValue: 0,
      maxCard: 4,
    };
  },
  methods: {
    slideCondoLeft() {
      if (this.translateValue !== 0) {
        this.translateValue += 100;
      }
    },
    slideCondoRight() {
      if (this.translateValue !== (this.condos.length - this.maxCard) * 100) {
        this.translateValue -= 100;
      }
    },
    slideEstateLeft() {
      if (this.translateValue !== 0) {
        this.translateValue += 100;
      }
    },
    slideEstateRight() {
      if (this.translateValue !== (this.estates.length - this.maxCard) * 100) {
        this.translateValue -= 100;
      }
    },
    slideTownhouseLeft() {
      if (this.translateValue !== 0) {
        this.translateValue += 100;
      }
    },
    slideTownhouseRight() {
      if (this.translateValue !== (this.townhouses.length - this.maxCard) * 100) {
        this.translateValue -= 100;
      }
    },
  },
};
</script>


<style>
@import "@/assets/css/landingpage_style.css";
</style>
