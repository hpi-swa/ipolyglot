git clone https://github.com/ipython-contrib/jupyter_contrib_nbextensions.git
pip install -e ./jupyter_contrib_nbextensions
cp -r ./varInspector ./jupyter_contrib_nbextensions/nbextensions/
jupyter contrib nbextensions install --user
