# The Polyglot Jupyter Kernel
<img width="1577" alt="Screenshot 2019-06-19 at 11 28 44" src="https://user-images.githubusercontent.com/9486619/59754072-af3fa400-9285-11e9-97fe-8ba5e03e41d2.png">

The Polyglot Jupyter Kernel is a [kernel for Jupyter notebooks](https://jupyter.readthedocs.io/en/latest/projects/kernels.html) that can handle multiple programming languages. It's running on [GraaLVM](https://www.graalvm.org/).

### Installing

Make sure to have GraalVM (tested with version 19.)

To install the kernel follow these steps:

```
# To install IPolyglot on Ubuntu, run:
sudo apt-get install nodejs-legacy npm ipython ipython-notebook  # you might skip this step if you already use jupyter notebooks
git clone https://github.com/hpi-swa-lab/pp19-3-jupyter-kernel.git 
cd ./pp19-3-jupyter-kernel && npm install . -g

# On MacOs, run:
brew install pkg-config node zeromq
pip install --upgrade pyzmq jupyter
git clone https://github.com/hpi-swa-lab/pp19-3-jupyter-kernel.git 
cd ./pp19-3-jupyter-kernel && npm install . -g --python=python2.7
```


### Using different programming languages

A different language can be used in each notebook cell. Simply specify the desired language as a [magic command](https://ipython.readthedocs.io/en/stable/interactive/magics.html) in the first line of the cell:

```ruby
%polyglot [language code]

[code]
```

for example:

```ruby
%polyglot python

my_dict = dict()
```

### Inspecting Polyglot variables

The Polyglot Jupyter Kernel shares all available global variables across all notebook cells. It provides an inspector extension to the Jupyter notebook frontend that lists all polyglot variables available.

To install the extension, move the exention's code found in `varInspector` to your local installation of the `jupyter_contrib_nbextensions` package and install it, like so:

```
cd ./pp19-3-jupyter-kernel  # make sure to run all commands from the repository's root
git clone https://github.com/ipython-contrib/jupyter_contrib_nbextensions.git
pip install -e ./jupyter_contrib_nbextensions
cp -r ./varInspector ./jupyter_contrib_nbextensions/src/jupyter_contrib_nbextensions/nbextensions/
jupyter contrib nbextensions install --user
jupyter nbextension enable varInspector/main
```