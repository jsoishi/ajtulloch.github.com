mixpanel.track('Page Viewed', 
                { 'page name' : document.title, 
                  'url' : window.location.pathname, 
                  'referrer': document.referrer
                });
