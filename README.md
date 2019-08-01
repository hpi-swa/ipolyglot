# The Polyglot Jupyter Kernel
<img width="1519" alt="Screenshot 2019-07-30 at 15 41 43" src="https://user-images.githubusercontent.com/9486619/62134314-8d076000-b2e0-11e9-950e-b773f41ac085.png">


The Polyglot Jupyter Kernel is a [kernel for Jupyter notebooks](https://jupyter.readthedocs.io/en/latest/projects/kernels.html) that can handle multiple programming languages. It's running on [GraaLVM](https://www.graalvm.org/).

### Installing

Make sure to [install](https://www.graalvm.org/downloads) GraalVM (latest tested version is v19.0.2) and ensure GraalVM's `node` and `npm` are in your `PATH`.

To install the kernel on linux follow these steps:
```sh
# 0. download and setup GraalVM
# 1. install python and pip:
yum install -y python36 python36-devel python36-pip
# 2. install the jupyter pip package:
pip3 install jupyter_core==4.4 jupyter
# 3. install ipolyglot from source:
git clone https://github.com/hpi-swa-lab/pp19-3-jupyter-kernel.git 
cd ./pp19-3-jupyter-kernel && npm install .
```

On MacOs, run:
```sh
# 0. download and setup GraalVM
# 1. install python and pip:
brew install python3
# 2. install additional dependencies
brew install pkg-config zeromq
# 3. install the jupyter pip package and its requirements
pip install jupyter_core==4.4 pyzmq jupyter
# 3. install ipolyglot from source:
git clone https://github.com/hpi-swa-lab/pp19-3-jupyter-kernel.git 
cd ./pp19-3-jupyter-kernel && npm install . --python=python2.7
```

Proceed by (re-)starting a jupyter notebook server (`jupyter notebook`) and creating a new GraalNode.js notebook.

### Using different programming languages

A different language can be used in each notebook cell. Simply specify the desired language as a [magic command](https://ipython.readthedocs.io/en/stable/interactive/magics.html) in the first line of the cell:

```ruby
%polyglot [language code]

[code]
```

for example:

```python
%polyglot python

my_dict = dict()
```

Please be aware that you can use languages that have been [installed to your GraalVM](https://www.graalvm.org/docs/reference-manual/graal-updater/) only.

### Inspecting Polyglot variables

The Polyglot Jupyter Kernel shares all available global variables across all notebook cells. It provides an inspector extension to the Jupyter notebook frontend that lists all polyglot variables available.

To install the extension, move the exention's code found in `varInspector` to your local installation of the `jupyter_contrib_nbextensions` package and install it, like so:

```sh
cd ./pp19-3-jupyter-kernel  # make sure to run all commands from the ipolyglot repository's root
git clone https://github.com/ipython-contrib/jupyter_contrib_nbextensions.git
pip install -e ./jupyter_contrib_nbextensions
cp -r ./varInspector ./jupyter_contrib_nbextensions/src/jupyter_contrib_nbextensions/nbextensions/
jupyter contrib nbextensions install --user
jupyter nbextension enable varInspector/main
```

Restart your notebook and toggle the variable inspector with the <kbd>🎯</kbd> button in top toolbar.

### Acknowledgments

This projects builds on the tremendous work of [Nicolas Riesco](https://github.com/n-riesco)'s [IJavascript](https://github.com/n-riesco/ijavascript), a Javascript kernel for Jupyter notebooks.
