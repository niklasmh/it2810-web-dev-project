var Observation = function () {}

Observation = function (taxonid, name) {
  this.TaxonId = taxonid
  this.Name = name
  this.ScientificName = ''
  this.Count = 1
  this.Notes = ''
  this.County = 'Akershus'
  this.Municipality = ''
  this.Locality = ''
  this.Longitude = ''
  this.Latitude = ''
  this.User = ''
}

// Observation = function(obj) {
//   this.TaxonId = obj.TaxonId
//   this.Name = obj.Name
//   this.ScientificName = obj.ScientificName
//   this.Count = obj.Count
//   this.Notes = obj.Notes
//   this.County = obj.County
//   this.Municipality = obj.Municipality
//   this.Locality = obj.Locality
//   this.Longitude = obj.Longitude
//   this.Latitude = obj.Latitude
//   this.User = obj.User
// }

module.exports = new Observation()
