# IPolyglot
A polyglot [Jupyter kernel](https://jupyter.readthedocs.io/en/latest/projects/kernels.html) for the [GraalVM](https://www.graalvm.org/).

<img width="1519" alt="Screenshot" src="https://user-images.githubusercontent.com/9486619/62134314-8d076000-b2e0-11e9-950e-b773f41ac085.png">

## Blog post

Get some more background on how IPolyglot works, by reading the blog post about the [HPI Polyglot Programming Seminar](https://medium.com/graalvm/hpi-polyglot-programming-seminar-3fd06ffa59d2). And thereafter, follow on with the rest of the sections below.

## Running IPolyglot on Docker

If you'd like to run IPolyglot on [Docker](https://www.docker.com/), this should get you started:

```sh
# 1. Clone IPolyglot's repository
git clone https://github.com/hpi-swa/ipolyglot.git
cd ipolyglot
# 2. Build an IPolyglot docker image
docker build --tag=ipolyglot .
# 3. Run it! (choose a different port by changing 8888:<desired port>)
docker run -p 8888:8888 ipolyglot
```

Proceed by opening a web-browser on `localhost:8888`, and creating a new notebook.

## Running IPolyglot from source

Make sure to [install](https://www.graalvm.org/downloads) GraalVM (latest tested version is v19.0.2) and ensure GraalVM's `node` and `npm` are in your `PATH`:

```sh
export PATH=$GRAALVM_HOME/Contents/Home/jre/languages/js/bin:$PATH
export PATH=$GRAALVM_HOME/Contents/Home/bin:$PATH
```

To install the kernel on Linux follow these steps:
```sh
# 0. download and setup GraalVM
# 1. install python and pip:
yum install -y python36 python36-devel python36-pip
# 2. install the jupyter pip package:
pip3 install jupyter_core==4.4 jupyter
# 3. install ipolyglot from source:
git clone https://github.com/hpi-swa/ipolyglot.git
cd ./ipolyglot && npm install .
```

On macOS, run:
```sh
# 0. download and setup GraalVM
# 1. install python and pip:
brew install python3
# 2. install additional dependencies
brew install pkg-config zeromq
# 3. install the jupyter pip package and its requirements
pip install jupyter_core==4.4 pyzmq jupyter
# 3. install ipolyglot from source:
git clone https://github.com/hpi-swa/ipolyglot.git
cd ./ipolyglot && npm install . --python=python2.7
```

Proceed by starting a Jupyter notebook server (`jupyter notebook`), opening a web-browser on `localhost:8888`, and creating a new notebook.


## Using different programming languages

A different language can be used in each notebook cell. Simply specify the desired language as a [magic command](https://ipython.readthedocs.io/en/stable/interactive/magics.html) in the first line of the cell. Available language codes are `python`, `js`, `ruby`, `R`.

```ruby
%polyglot [language code]

[code]
```

for example:

```python
%polyglot python

my_dict = dict()
```

See the [`polyglot-notebook.ipynb`](demo/polyglot-notebook.ipynb) for a detailed example.

Please be aware that you can use languages that have been [installed to your GraalVM](https://www.graalvm.org/docs/reference-manual/graal-updater/) only.

## Inspecting Polyglot variables

The Polyglot Jupyter Kernel shares all available global variables across all notebook cells. It provides an inspector extension to the Jupyter notebook frontend that lists all polyglot variables available.

To install the extension, move the extension's code found in `varInspector` to your local installation of the `jupyter_contrib_nbextensions` package and install it, like so:

```sh
cd ./ipolyglot  # make sure to run all commands from the ipolyglot repository's root
git clone https://github.com/ipython-contrib/jupyter_contrib_nbextensions.git
pip install -e ./jupyter_contrib_nbextensions
cp -r ./varInspector ./jupyter_contrib_nbextensions/src/jupyter_contrib_nbextensions/nbextensions/
jupyter contrib nbextensions install --user
jupyter nbextension enable varInspector/main
```

Restart your notebook and toggle the variable inspector with the <kbd>🎯</kbd> button in top toolbar.

## Debugging the IPolyglot Kernel

This describes how to debug the IPolyglot Kernel, _not_ how to debug code executed in the code cells.

The `jupyter notebook` command can be invoked like this `DEBUG=true jupyter-notebook --debug` to get debugging information about the messages sent between the kernel and the Jupyter notebook.

However, it has often been more helpful to pass debug flags to GraalVM's Node.js process which actually evaluates the code of Jupyter Notebook cells. This is done in node_modules/nel/lib/nel.js where `Session._args` is defined. There is a commented out line which already includes the necessary flags and can be commented in if need be. Then, a `debugger;` statement can be set anywhere in the NEL code and the Node.js session can be found in [chrome://inspect/#devices](chrome://inspect/#devices) for debugging.

## Current Limitations

### [Output and error handling](https://github.com/hpi-swa/ipolyglot/issues/13)

Currently, if `print` / `put` / ... is called in a language other than JavaScript inside a Jupyter Notebook code cell, the print output is not displayed in the frontend of the Jupyter Notebook. Similarly, if an error occurs during execution of the code of a cell, the error might not be properly propagated to the frontend for display to the user.

We've tried a bunch of things to make output and error handling work but have not completely succeeded. Below we want to document two approaches that seem most promising.

#### Approach 1 (more preferable option)

Branch: https://github.com/hpi-swa/ipolyglot/tree/feature/output_handling_polyglot_context

This approach creates a `org.graalvm.polyglot.context polyglotContext` in node_modules/nel/lib/server/main.js and passes a `ByteArrayOutputStream polyglotStdout` to it. Whenever `polyglotContext.eval` is called now, print outputs of the executed code is written to `polyglotStdout`. Later on, `polyglotStdout`'s contents can be easily accessed and redirected to the frontend. See short code example here: https://github.com/hpi-swa-lab/pp19/issues/19#issuecomment-514649627

Regarding error handling: If an error occurs during the call to `polyglotContext.eval`, the error is caught and the original error message from the guest language is redirected to the frontend (`initialContext.console.error(codeCellStderr)`).

The issue with this approach is that it doesn't work together at all with our automatic import/export feature: To make the automatic import/export work, we use `Polyglot.eval`, `Polyglot.import` and `Polyglot.export`. However, once we use our custom `polyglotContext.eval` (to capture the stdout properly), the code is evaluated in another context than the context we access using `Polyglot.*`. Therefore, we e.g. can't export variables defined in `polyglotContext.eval` using `Polyglot.import`. According to the [docs](https://www.graalvm.org/sdk/javadoc/org/graalvm/polyglot/Context.html#getPolyglotBindings--), we might be able to work around this by doing `polyglotContext.getPolyglotBindings.import()` / `...export()`. However, calling `polyglotContext.getPolyglotBindings` results in [an error](https://github.com/hpi-swa-lab/pp19/issues/20). If the issue can be solved, this approach seems to be most appropriate and clean.

#### Approach 2 (less preferable option)

Branch: https://github.com/hpi-swa/ipolyglot/tree/feature/output_handling

This approach redirects the output from the code evaluation process to a log file and reads from it to send it to the Jupyter Notebook frontend. The solution works, however the lag can be pretty big at times and once you try to restart the kernel from the Jupyter Notebook frontend, the kernel becomes completely unresponsive and you have to restart the entire Jupyter Notebook server process and kill an orphaned/zombie (?) Node.js process manually. We suspected this might be due to a missing close or end call to the file write stream but we checked this and it doesn't seem to be the underlying issue.

We assume that the same approach can be taken to handle errors raised during code cell execution as well but have not tested this yet.

In node_modules/nel/lib/nel.js, a write stream `tmp_stdout` is created which writes into a file 'tmp_stdout.log'. This write stream is specified as the stdout handle for the code evaluation process via `this._config = { stdio: [<stdin>, tmp_stdout, ...] }`.

The code evaluation process itself defines a `stdout_tail` in node_modules/nel/lib/server/main.js which listens to any output redirected to the 'tmp_stdout.log' file and sends it to the Jupyter Notebook frontend.


## Acknowledgments

This projects builds on the tremendous work of [Nicolas Riesco](https://github.com/n-riesco)'s [IJavascript](https://github.com/n-riesco/ijavascript), a Javascript kernel for Jupyter notebooks.
