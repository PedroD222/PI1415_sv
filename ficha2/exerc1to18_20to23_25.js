exercicio 3 
 newReleases.forEach(function(release){
						videoAndTitlePairs.push({id : release.id, title:release.title});
					});
  
  
exercicio 4
results.push(projectionFunction(itemInArray));


exercicio 5
  return newReleases.map(function(release){
							return function(release){id : release.id, title : release.title}
						});


exercicio 6
  newReleases.forEach(function(v){
						if (v.rating>4 )
							videos.push(v);
					});
  
  
exercicio 7 
if (predicateFunction.call(this, itemInArray))
      results.push(itemInArray);
  
  
8
return newReleases.filter(function(r){
						if (r.rating>4)
							return r; 
					}).map(function(rw){
							return rw.id;
						});


9
var i=0;
  movieLists.forEach(function(mv){
    mv.videos.forEach(function(v){
						allVideoIdsInMovieLists[i++]=v.id;
					});
				});
	
	
10
function(subArray) {
    //if (typeof(subArray)!== Array ) throw "err";
    subArray.forEach(function(a){
    					results.push(a);
    				});

					
11
return movieLists.map(function(x){
						return x.videos.map(function(v){return v.id;})
					}).concatAll();

					
12
return movieLists.map(function(moviel){
    return moviel.videos.map(function(mv){
								return mv.boxarts.filter(function(b){
        													if(b.width==150 && b.height==200)
                        										return b.url;
                        								}).map(function(b){
                        										return {id:mv.id,
																		title:mv.title,
																		boxart:b.url}}
																);
								}
							).concatAll()
  					}
				).concatAll() 


13
return projectionFunctionThatReturnsArray(item);


14
return movieLists.concatMap(function(movie){
    return movie.videos.concatMap(function(video){
      								return video.boxarts.filter(function(barts){
																	if(barts.width==150 && barts.height==200)
                        												return barts.url;
                        										}).map(function(b){
                        												return {id: video.id,
																				title: video.title,
																				boxart:b.url}}
																);
								});
							});


17
return ratings.
    reduce(
      /*function(acc, newv){
      				var aux = acc;
    				if(newv>aux)
                      aux=newv;
                    return aux;
    }*/
    function(acc, newv){
    			if(newv>acc)
					return newv;
      			else
                    return acc;
    			}
	);
	
18
return boxarts.reduce(function(larg,cur){
						var largdim = larg.width * larg.height;
   						var curdim = cur.width * cur.height;
   						if (largdim>curdim)
							return larg
   						return cur;
					}).map(function(n){return n.url;});
					
exercicio 19
					

					
exercicio 20
//almost done array boxart 
return movieLists.
		concatMap(function(movieList) {
      return movieList.videos.map(function(v){
                                  return {id : v.id,
                                         title : v.title,
                                         boxart: v.boxarts.reduce(function(small,cur){
                                                                    var smalldim = small.width * small.height;
                                                                    var curdim = cur.width * cur.height;
                                                                    if (smalldim<curdim)
                                                                       return small;
                                                                    return cur;
                                                        }).map(function(n){return n.url})
                                          }})
                    })

exercicio 21
videoIdAndBookmarkIdPairs.push({videoId : videos[counter].id, bookmarkId : bookmarks[counter].id})


exercicio 22
results.push(combinerFunction(left[counter],right[counter]))


exercicio 23
return Array.
    zip(videos, bookmarks, function(v,b){return {videoId:v.id, bookmarkId:b.id}} );
	
exercicio 24



exercicio 25
return lists.map(function(l){return {name:l.name, 
                                    videos: videos.filter(function(v){
   														if(l.id === v.listId)
                                                            return v;
                                                        }).map(function(l){return {id:l.id, 
																					title: l.title}})
                                    }})
