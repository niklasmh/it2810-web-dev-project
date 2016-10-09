== README for json-filer ==

Det er lagt til individuelle json-filer for hver art:
	Første nummer er TaxonId ("3846").
	Deretter latinsk navn på arten ("Pandion haliaetus").
	Til slutt antall observasjoner ("(1000 stk)").
	Eksempel API-kall:
		http://artskart2.artsdatabanken.no/api/observations/list?Taxons=31222&pageSize=1000

Fila "all.json" inneholder 5000 observasjoner blant alle artene.
	API-kall for alt unntatt gaupe og fiskeørn:
		http://artskart2.artsdatabanken.no/api/observations/list?Taxons=77987,31113,31133,31140,31237,31267,31292,31222&pageSize=3000&pageIndex=0
	API-kall for gaupe og fiskeørn:
		http://artskart2.artsdatabanken.no/api/observations/list?Taxons=3846,31163&pageSize=3000&pageIndex=0