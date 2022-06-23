# InfiniteScroll

<!--version-->

[InfiniteScroll](https://github.com/itformat/infinitescroll/) is a modular infinite scroll plugin for Bootstrap.

## Live Demo
See live at https://www.format.it/demo/infinitescroll

## Screen shots
<a href="https://www.format.it/demo/infinitescroll">
  <img alt="InfiniteScroll" src="https://www.format.it/demo/infinitescroll/screenshots/0001.png" />
</a>

## Install
- Cloning using Git: `git clone https://github.com/ITformat/infinitescroll.git`

## Versions

First release 1.0.1

Dependecies:
  - Vue 2.6.14
  - Jquery v3.6.0
  - Bootstrap v.4.6.0

## Example

```html
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Format InfiniteScroll</title>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

  <meta name="author" content="Marco Montagnani">

  <!-- Bootstrap core CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css" crossorigin="anonymous">

  <!-- Font awesome CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />

  <!-- Animate css -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css" crossorigin="anonymous" />

  <!-- Custom css -->
  <link rel="stylesheet" href="./index.css">

  <!-- jQuery -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" crossorigin="anonymous"></script>

  <!-- jQuery Easing plugin -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js" crossorigin="anonymous"></script>

  <!-- Bootstrap JS -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>

  <!-- Font awesome -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js" data-observe-mutations="false" crossorigin="anonymous"></script>

  <!-- Lazy loading -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.lazy/1.7.10/jquery.lazy.min.js" crossorigin="anonymous"></script>

  <!-- Vue -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.14/vue.min.js" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

  <!-- Infinite scroll -->
  <script src="./vue.infinitescroll-1.0.1.js"></script>

  <!-- Custom javascript -->
    <script src="./index.js"></script>

</head>

<body id="page-top" class="text-center">

  <main role="main">

    <div class="container marketing">

      <!-- Search button -->
      <form asp-controller="Home" asp-action="Index" method="get" data-type="search" class="form-inline justify-content-end mt-2">
        <div class="input-group">
          <input id="inputSearch" name="search" type="text" placeholder="" class="form-control mr-2" value="" aria-label="Search">
          <div class="input-group-append">
            <button class="btn btn-outline-success" type="submit"><span class="fa fa-search mr-2"></span>Search</button>
          </div>
        </div>
     </form>

      <div id="listAuctions" class="pt-0"
           v-format-infinite-scroll="afterbind"
           data-scrollmode="click&scroll"
           data-url="./items.json"
           data-type="GET"
           data-loadonstart="true"
           data-request='{"startIndex":0,"counter":0,"pageSize":6,"filter":null,"order":null}'
           data-loading="Loading..."
           data-noitems="No items found with the selected filters"
           data-allload="All items loaded"
           data-userid="0"
           data-offset="1080">

        <div data-type="startMarker" class="pb-2"></div>
        <div class="row">
          <div class="col-7 text-left form-inline mr-0 pr-0">
            <div class="dropright d-none d-md-block ml-0">
              <button type="button" id="FilterDistance" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-outline-success dropdown-toggle border">
                <span class="fa fa-filter mr-2"></span><span data-type="distance">Km</span>
              </button> <div id="DropdownFilterDistance" class="dropdown-menu">
                <div data-type="orderList">
                  <a data-type="distanceItem" data-distance="" href="#" class="dropdown-item">
                    <span data-type="distance">All</span>
                  </a>
                  <a data-type="distanceItem" data-distance="10" href="#" class="dropdown-item"><span data-type="distance">10 Km</span></a>
                  <a data-type="distanceItem" data-distance="50" href="#" class="dropdown-item"><span data-type="distance">50 Km</span></a>
                  <a data-type="distanceItem" data-distance="100" href="#" class="dropdown-item"><span data-type="distance">100 Km</span></a>
                </div>
              </div>
            </div>
          </div> <div class="col-5 text-right">
            <div class="dropdown">
              <button type="button" id="dropdownMenuButtonOrder" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-outline-success dropdown-toggle border">
                <span class="fas fa-sort-amount-down-alt mr-2"></span><span data-type="orderName">New</span>
              </button>
              <div id="DropdownOrder" aria-labelledby="dropdownMenuButton" class="dropdown-menu mr-4">
                <div data-type="orderList">
                  <a data-type="orderItem" data-order="New" href="#" class="dropdown-item"><span class="far fa-clock text-success mr-2"></span><span data-type="orderName">New</span></a>
                  <a data-type="orderItem" data-order="Distance" href="#" class="dropdown-item"><span class="fas fa-map-marker-alt text-success mr-2"></span><span data-type="orderName">Distance</span></a>
                  <a data-type="orderItem" data-order="Price" href="#" class="dropdown-item"><span class="fas fa-euro-sign text-success mr-2"></span><span data-type="orderName">Price</span></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="mb-1 mt-1">
        <div class="row">
          <div class="col-12 text-right pr-0">
            <p class="lead">
              <span id="itemsText">Items found </span>
              <span data-type="itemsFound" class="badge badge-pill badge-success">30</span>
            </p>
          </div>
        </div>

        <div class="row px-3">

          <div class="col" data-type="itemsList">

            <div id="auctionsContainer" class="row align-items-end">

              <template v-for="(item, index) in model">

                <!-- Divider -->
                <div :class="'col-12' + [(index % 2 === 0) ? '' : ' d-none d-md-block'] + ' p-0'" v-if="index != 0">
                  <hr class="mb-3 mb-md-5 mt-0">
                </div>

                <div class="col-6 col-md-12 mb-2 mb-md-5">
                  <div class="row" :id="'auction-' + [item.AuctionID]">

                    <!-- Image preview -->
                    <div :class="'col-md-6 order-1 order-md-' + [(index % 2 === 0) ? '1' : '0'] + ' px-1 py-0 p-md-0'">
                      <div class="row">

                        <!-- Circle icon buttons -->
                        <div :class="'d-none d-md-block col col-lg-2 ' + [(index % 2 === 0) ? 'pl-0' : 'pr-0'] + ' order-lg-' + [(index % 2 === 0) ? '1' : '0'] + ' pb-2'" :data-tags="item.Tags">
                          <!-- Gavel -->
                          <button v-show="item.Tags.includes('#gavel')" class="animated fadeIn btn btn-outline-dark tag-circle rounded-circle p-0 mb-md-1 disabled" style="opacity:.8; animation-delay:.9s" data-tags="#gavel" v-tooltip="{ title: 'tooltipNoReservePrice', direction : 'top' }">
                            <span class="fa fa-gavel"></span>
                          </button>
                        </div>

                        <!-- Image parts -->
                        <div class="col-lg-10">

                          <!-- Status -->
                          <div class="row">
                            <div class="col pt-0 pt-md-2 pb-2">
                              <a style="text-decoration: none;">
                                <div :class="'border pt-1 pb-1 rounded bg-'+[item.RealAuctionStatusName]" v-html="item.RealAuctionStatusName"></div>
                              </a>
                            </div>
                          </div>

                          <!-- Images -->
                          <div class="row mt-2 mt-md-0">
                            <div class="col">
                              <div class="ratio-box" v-tooltip="{ title: item.Title, direction : (index % 2 === 0) ? 'right' : 'left'}">
                                <a>
                                  <div class="img-loading" style="color:#218838">
                                    <span class="fa fa-2x fa-spin fa-spinner"></span>
                                  </div>
                                  <img class="ratio-img img-fluid btn btn-light border p-2 rounded" :data-src="item.Image.Url" src="./img/null.png" :alt="item.Title" v-lazyloading="{ miss: item.ImageMiss.Url}">
                                </a>
                              </div>
                            </div>
                          </div>

                          <!-- Price sm screen -->
                          <div class="row d-md-none">

                            <div :class="'col order-md-' + [(index % 2 === 0) ? '0' : '1'] + ' lead pb-0 pb-md-2'">
                              <p class="lead-sm mb-0 mb-md-3">
                                <span class="currency-sm">€</span>
                                <span class="units-sm" v-html="priceNumbers(item.StartPrice)"></span><span class="decimal-sm" v-html="priceDecimals(item.StartPrice)"></span>
                              </p>
                            </div>
                          </div>

                          <!-- Price md screen -->
                          <div class="row d-none d-md-block">

                            <div :class="'col order-md-' + [(index % 2 === 0) ? '0' : '1'] + ' lead pb-0 pb-md-2'">
                              <p class="lead mb-0 mb-md-3">
                                <span>Price:</span>
                                <span class="currency">€</span>
                                <span class="units" v-html="priceNumbers(item.StartPrice)"></span><span class="decimal" v-html="priceDecimals(item.StartPrice)"></span>
                              </p>
                            </div>

                          </div>

                          <!-- Buttons -->
                          <div class="row d-none d-md-block" v-show="(item.RealAuctionStatusName!='Closed'&&item.RealAuctionStatusName!='Sold')">
                            <div class="col-8 offset-2 col-xl-6 offset-xl-3" :data-auctionID="item.AuctionID">

                              <div v-show="item.RealAuctionStatusName=='OnSale'||item.RealAuctionStatusName=='Closing'">
                                <!-- Button Buy -->
                                <a :class="'btn ' + [item.User.UserID == options.userid ? 'border' : 'btn-success'] + ' col-12 w-100'"
                                   :style="[item.User.UserID == options.userid ? {'pointer-events': 'none', 'opacity': '0.7'} : {'cursor': 'pointer', 'color': 'white'}]"
                                   v-tooltip="{ title: 'Buy', direction : 'bottom' }">
                                  <span class="fa fa-coins mr-2"></span>
                                  <span>Buy it now</span>
                                </a>
                              </div>

                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                    <!-- Description -->
                    <div :class="'col-md-6 order-md-' + [(index % 2 === 0) ? '0' : '1']">
                      <div class="row pb-0 pb-md-3">
                        <div :class="'d-none d-md-block col-12 col-lg-2 order-lg-' + [(index % 2 === 0) ? '0' : '1'] + ' p-0'">

                          <a href="#">
                            <img class="btn btn-light ratio-img border img-fluid p-1 rounded-circle" :src="item.User.Image.Url" @error="$event.target.src = [item.User.ImageMiss.Url];" style="width:80px; height:80px; position:relative;" alt="Avatar" v-tooltip="{ title: item.User.NickName, direction: 'top'}" />
                          </a>
                          <div class="font-weight-bold">
                            {{item.User.NickName}}
                          </div>
                        </div>

                        <div :class="'col-12 col-lg-10 order-md-' + [(index % 2 === 0) ? '1' : '0'] + ' px-1 px-md-3'">
                          <div style="cursor:pointer;">
                            <!-- Md title -->
                            <h2 class="featurette-heading d-none d-md-block">{{item.Title}}</h2>
                            <!-- Sm title -->
                            <h5 class="featurette-heading-sm d-md-none mb-2">{{item.Title}}</h5>
                          </div>

                          <!-- Subtitle -->
                          <h3 v-show="item.SubTitle!=null" class="pb-0 mb-3 d-none d-md-block"><span class="text-muted">{{item.SubTitle}}</span></h3>

                          <p class="d-none d-md-block mb-0 mb-md-3">
                            <span v-for="hashTag in item.SearchTags" class="badge badge-pill badge-success ml-1" data-type="tag" :data-tag="hashTag" style="cursor:pointer" v-on:click="search($event)">{{hashTag}}</span>
                          </p>

                          <!-- Place -->
                          <div v-show="(item.Place.City != '')">
                            <hr class="d-none d-md-block m-0 p-0" />
                            <div class="row d-none d-md-block">
                              <div class="col lead">
                                <span class="fa fa-map-marker-alt mr-2"></span><span data-type="city" :data-city="item.Place.City" style="cursor:pointer" v-on:click="searchPlace($event)">{{item.Place.City}}</span>{{space(item)}}<span data-type="district" :data-district="item.Place.District" style="cursor:pointer" v-on:click="searchPlace($event)">{{item.Place.District}}</span>
                              </div>
                            </div>
                            <br class="d-none d-md-block" />
                          </div>

                          <!-- Description -->
                          <p class="d-none d-md-block lead m-0 new-line-text">{{decodeHtml(item.Description)}}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </template>

            </div>

          </div>

        </div>

        <button data-type="listMore" data-toggle="tooltip" data-placement="top" title="" class="btn btn-outline-success" data-original-title="Load more">
          <span data-type="loaded" class="fa fa-arrow-down mr-2" style="display:none"></span><span data-type="loading" class="fa fa-spin fa-spinner mr-2"></span>Load more items...
        </button>

        <div data-type="progressBar" class="progress-bar progress-bar-striped progress-bar-animated bg-success bg" style="display:none">Load more items...</div>

      </div>

      <div class="container pt-5 text-center">
        <label class="col-form-label text-nowrap"><italic>*Thanks to all everybody that will support this project.*</italic></label>
        <form action="https://www.paypal.com/donate" method="post" target="_top">
          <input type="hidden" name="hosted_button_id" value="FDL9PF2E2MGF8" />
          <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
        </form>
      </div>

    </div>

  </main>

  <!-- Page scroll button -->
  <div class="floating-bottom-container p-4" style="right:0; z-index:10;">
    <a href="#page-top" class="btn btn-outline-success page-scroll pt-2 pb-2 h-auto" data-toggle="tooltip" title="BackToTop">
      <span class="fa fa-arrow-up"></span>
    </a>
  </div>

  <!-- Bootstrap modal -->
  <div id="modalCenter" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalTitle"></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div id="modalBody" class="modal-body">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Custom javascript -->
  <script type="text/javascript">

    // Ready
    $(document).ready(function () {

      // Init Vue (data get from data-model tag)
      initVue(null);
    });

  </script>

</body>

</html>
```
## Contributions
* [Issues](https://github.com/ITformat/InfiniteScroll/issues)
* [Pull Requests](https://github.com/ITformat/InfiniteScroll/pulls)
* [Milestones](https://github.com/ITformat/InfiniteScroll/milestones)

This project exists thanks to all the [people who contribute](https://github.com/ITformat/InfiniteScroll/graphs/contributors).

## License
The MIT License (MIT).
Please see the [License File](https://github.com/ITformat/InfiniteScroll/blob/main/LICENSE) for more information.

## Credits

Written and maintained by [Marco Montagnani](https://www.format.it/#team) and all other contributors.

<a class="readme-logo" href="https://www.format.it/">
  <img alt="Format" src="https://www.format.it/img/logo-format.png" width="300px" />
</a>

*Thanks to all everybody that will support this project.*

[![Paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/donate?hosted_button_id=FDL9PF2E2MGF8)


